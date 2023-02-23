package ir.bpr.soundload.ui.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Toast;
import ir.bpr.soundload.R;
import java.io.File;

public class SplashActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            requestWindowFeature(1);
            if (Build.VERSION.SDK_INT >= 21) {
                getWindow().getDecorView().setSystemUiVisibility(4098);
            }
            if (Build.VERSION.SDK_INT >= 21) {
                getWindow().setFlags(1024, 1024);
            }
            setContentView(R.layout.activity_splash);
			
			deleteCache(getApplicationContext());

            new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        Intent move = new Intent(SplashActivity.this, MainActivity.class);
                        move.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                        move.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(move);
                        overridePendingTransition(0,0);
                        finish();
                    }
                }, 1500); // wait for 2.5 seconds
        } catch( Exception e ) {
            Toast.makeText(getApplication(), e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }
	
	public static void deleteCache(Context context) {
		try {
			File dir = context.getCacheDir();
			deleteDir(dir);
		} catch (Exception e) { e.printStackTrace();}
	}

	public static boolean deleteDir(File dir) {
		if (dir != null && dir.isDirectory()) {
			String[] children = dir.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteDir(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
			return dir.delete();
		} else if(dir!= null && dir.isFile()) {
			return dir.delete();
		} else {
			return false;
		}
	}
}
