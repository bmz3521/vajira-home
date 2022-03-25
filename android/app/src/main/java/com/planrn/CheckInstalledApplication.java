package com.planrn;

import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CheckInstalledApplication extends ReactContextBaseJavaModule {
    CheckInstalledApplication(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void isInstalled(String packageName,Promise pm) {
       try {
           getReactApplicationContext().getPackageManager().getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
           pm.resolve(true);
       } catch (PackageManager.NameNotFoundException e) {
           pm.resolve(false);
       }
    }

    @Override
    public String getName() {
        return "CheckInstalledApplication";
    }
}

