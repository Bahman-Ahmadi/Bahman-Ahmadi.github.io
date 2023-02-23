package ir.bpr.soundload.ui.activity;

import android.Manifest;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import ir.bpr.soundload.R;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import java.net.URLEncoder;
import java.io.UnsupportedEncodingException;
import android.util.Log;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import ir.tapsell.sdk.*;

public class MainActivity extends Activity {
	public ProgressDialog mProgressDialog;
	public WebView webView;
	private static final String ZONE_ID = "63f38a4b6872264315c8e71f";
	private TapsellAd ad;
	public boolean adShow = false;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		
		// delete action bar
		requestWindowFeature(1);
		
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.web_view);
		SharedPreferences prefs = getSharedPreferences("Prefs", MODE_PRIVATE);
		String sharedURL = getIntent().getStringExtra("android.intent.extra.TEXT");
		if (sharedURL == null) {
			webView.loadUrl(getResources().getString(R.string.origin) + "/?id=" + prefs.getString("guid", "undefined"));
		} else {
			sharedURL = sharedURL.split("\n")[1];
			webView.loadUrl(getResources().getString(R.string.origin) + "/dl?user=" + prefs.getString("guid", "undefined") + "&link=" + sharedURL);
		}
		webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
    	webView.setWebViewClient(new WebViewClient());
		
		loadAd(ZONE_ID);
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.System.canWrite(this)) {
			requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, 2909);
		}
	}
	
	@Override
	public void onBackPressed() {
		if (webView.canGoBack()) {
			webView.goBack();
		}
	}
	
	
	public class WebAppInterface {
		Context mContext;

		/** Instantiate the interface and set the context */
		WebAppInterface(Context c) {
			mContext = c;
		}

		@JavascriptInterface
		public void showToast (String toast) {
			Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
		}
		
		@JavascriptInterface
		public void download (String url, String filename) {
			mProgressDialog = new ProgressDialog(MainActivity.this);
			mProgressDialog.setMessage("در حال دانلود...");
			mProgressDialog.setIndeterminate(true);
			mProgressDialog.setIcon(R.drawable.ic_launcher);
			mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
			mProgressDialog.setCancelable(true);

			// execute this when the downloader must be fired
			final DownloadTask downloadTask = new DownloadTask(MainActivity.this); // MainActivity = activity name
			downloadTask.filename = filename;
			downloadTask.execute(url); // the url to the file you want to download

			mProgressDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
                @Override
                public void onCancel(DialogInterface dialog) {
                    downloadTask.cancel(true);
                }
            });
		}
		
		@JavascriptInterface
		public void shareLink (String link) {
			Intent intent = new Intent(Intent.ACTION_SEND);
			intent.setType("text/plain");
			intent.putExtra(Intent.EXTRA_TEXT, link);
			startActivity(Intent.createChooser(intent, "Share via"));
		}
		
		@JavascriptInterface
		public void playMusic (String filename) {
			Intent musicIntent = new Intent();
            musicIntent.setAction(Intent.ACTION_VIEW);
			musicIntent.setDataAndType(Uri.fromFile(new File(new File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/Soundload"), filename)), "audio/*");
            startActivity(musicIntent);
		}
		
		@JavascriptInterface
		public boolean isAdShown() {
			return MainActivity.this.adShow;
		}
		
		@JavascriptInterface
		public void showAD () {
			loadAd(ZONE_ID);
			//Toast.makeText(getApplication(), MainActivity.this.ad + "★" + MainActivity.this.ad.isValid(), Toast.LENGTH_LONG).show();
			if (MainActivity.this.ad != null && MainActivity.this.ad.isValid()) {
				TapsellShowOptions showOptions = new TapsellShowOptions();
				showOptions.setBackDisabled(false);
				showOptions.setImmersiveMode(true);
				showOptions.setRotationMode(TapsellShowOptions.ROTATION_UNLOCKED);

				MainActivity.this.ad.show(MainActivity.this, showOptions, new TapsellAdShowListener() {
					@Override
					public void onOpened(TapsellAd arg0) {
						Log.d("Tapsell","Ad Opened");
					}
					
					@Override
					public void onClosed(TapsellAd arg0) {
						Log.d("Tapsell","Ad Closed");
					}
				});
			}
			Tapsell.setRewardListener(new TapsellRewardListener() {
				
				@Override
				public void onAdShowFinished(TapsellAd ad, boolean completed) {
					MainActivity.this.adShow = completed;
				}
			});
			
		}
		
		@JavascriptInterface
		public void setItem (String key, String value) {
			SharedPreferences shared = getSharedPreferences("Prefs", MODE_PRIVATE);
			SharedPreferences.Editor editor = shared.edit();
			editor.putString(key, value);
			editor.apply();
		}
		
		@JavascriptInterface
		public String getItem (String key) {
			SharedPreferences shared = getSharedPreferences("Prefs", MODE_PRIVATE);
			SharedPreferences.Editor editor = shared.edit();
			return shared.getString(key, "undefined");
		}
	}

	// usually, subclasses of AsyncTask are declared inside the activity class.
	// that way, you can easily modify the UI thread from here
	private class DownloadTask extends AsyncTask<String, Integer, String> {

		private Context context;
		public String filename;
		
		public DownloadTask(Context context) {
			this.context = context;
		}

		@Override
		protected String doInBackground(String... sUrl) {
			// take CPU lock to prevent CPU from going off if the user 
			// presses the power button during download
			PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
			PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK,
													  getClass().getName());
			wl.acquire();

			try {
				InputStream input = null;
				OutputStream output = null;
				HttpURLConnection connection = null;
				try {
					URL url = new URL(sUrl[0]);
					connection = (HttpURLConnection) url.openConnection();
					connection.connect();

					// expect HTTP 200 OK, so we don't mistakenly save error report 
					// instead of the file
					if (connection.getResponseCode() != HttpURLConnection.HTTP_OK)
						return "Server returned HTTP " + connection.getResponseCode() 
							+ " " + connection.getResponseMessage();

					// this will be useful to display download percentage
					// might be -1: server did not report the length
					int fileLength = connection.getContentLength();

					// download the file
					input = connection.getInputStream();
					String root = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
					File dir = new File(root + "/Soundload");
					if (!dir.exists()) {
						dir.mkdirs();
					}
					output = new FileOutputStream(root + "/Soundload/" + filename);

					byte data[] = new byte[4096];
					long total = 0;
					int count;
					while ((count = input.read(data)) != -1) {
						// allow canceling with back button
						if (isCancelled())
							return null;
						total += count;
						// publishing the progress....
						if (fileLength > 0) // only if total length is known
							publishProgress((int) (total * 100 / fileLength));
						output.write(data, 0, count);
					}
				} catch (Exception e) {
					return e.toString();
				} finally {
					try {
						if (output != null)
							output.close();
						if (input != null)
							input.close();
					} 
					catch (IOException ignored) { }

					if (connection != null)
						connection.disconnect();
				}
			} finally {
				wl.release();
			}
			return null;
		}

		@Override
		protected void onPreExecute() {
			super.onPreExecute();
			mProgressDialog.show();
		}

		@Override
		protected void onProgressUpdate(Integer... progress) {
			super.onProgressUpdate(progress);
			// if we get here, length is known, now set indeterminate to false
			mProgressDialog.setIndeterminate(false);
			mProgressDialog.setMax(100);
			mProgressDialog.setProgress(progress[0]);
		}

		@Override
		protected void onPostExecute(String result) {
			mProgressDialog.dismiss();
			if (result != null) {
				Toast.makeText(context,"Download error: "+result, Toast.LENGTH_LONG).show();
			} else {
				MainActivity.this.adShow = false;
				Toast.makeText(context,"فایل "+filename+" دانلود شد", Toast.LENGTH_LONG).show();
			}
		}

	}
	
	private void loadAd(String zoneId) {

        TapsellAdRequestOptions options = new TapsellAdRequestOptions(TapsellAdRequestOptions.CACHE_TYPE_STREAMED);

        Tapsell.requestAd(this, zoneId, options, new TapsellAdRequestListener() {
				@Override
				public void onError(String error) {
					Log.d("Tapsell", "Error: " + error);
				}

				@Override
				public void onAdAvailable(TapsellAd ad) {
					MainActivity.this.ad = ad;
					Log.d("Tapsell", "Ad is available");
				}

				@Override
				public void onNoAdAvailable() {
					Log.d("Tapsell", "No ad available");
				}

				@Override
				public void onNoNetwork() {
					Log.d("Tapsell", "No network");
				}

				@Override
				public void onExpiring(TapsellAd ad) {
					loadAd(ZONE_ID);
				}
			});

    }
}






