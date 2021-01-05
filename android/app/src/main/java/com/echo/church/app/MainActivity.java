package com.echo.church.app;

import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;
import expo.modules.splashscreen.singletons.SplashScreen;
import expo.modules.splashscreen.SplashScreenImageResizeMode;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Discard any Activity state persisted during the Activity restart process to avoid inconsistencies that lead to crashes
        // https://github.com/software-mansion/react-native-screens#android
        super.onCreate(null);

        // SplashScreen.show(...) has to be called after super.onCreate(...)
        SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class, false);
    }

    // Added automatically by Expo Config
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        sendBroadcast(intent);
    }


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
