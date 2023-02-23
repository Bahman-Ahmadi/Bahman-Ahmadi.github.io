package ir.bpr.soundload;

import android.app.Application;
import ir.bpr.soundload.common.crash.CrashHandler;
import ir.tapsell.sdk.*;

public class App extends Application {
	private static final String TAPSELL_KEY = "gfgntajtqgdfiosigjobdcmpatpncdajhhegmqitskqehloklaljpjpnfnkdoigjnifjcd";
    private static App sApp;

    @Override
    public void onCreate() {
        super.onCreate();
		Tapsell.initialize(this, TAPSELL_KEY);
        sApp = this;
        CrashHandler.init(this);
    }

    public static boolean isNightMode() {
        return getApp().getResources().getBoolean(R.bool.night_mode);
    }

    public static App getApp() {
        return sApp;
    }

}
