package com.awesomeproject;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import android.preference.PreferenceManager;
import android.widget.*;
import android.content.*;

public class HelloWorldModule extends ReactContextBaseJavaModule {

    public HelloWorldModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "HelloWorld";
    }

    @ReactMethod
    public void myMobile(String message) {
        writeToPreference(message);
    }

    @ReactMethod
    public void getMobileNumber() {
        readPreference();
    }

    private static final String myPref = "mobilePref";
    private void writeToPreference(String thePreference)
    {
        SharedPreferences.Editor editor = getReactApplicationContext().getSharedPreferences(myPref,0).edit();
        editor.putString("theMobileNo", thePreference);
        editor.commit();

        SharedPreferences sp = getReactApplicationContext().getSharedPreferences(myPref,0);
        String str = sp.getString("theMobileNo","EmptyKey");

        if(str != "EmptyKey" && str != "" && str != null)
            Toast.makeText(getReactApplicationContext(), "Number " + str + " saved", Toast.LENGTH_SHORT).show();
        else
            Toast.makeText(getReactApplicationContext(), "Error! Number not saved", Toast.LENGTH_SHORT).show();
    }

    private void readPreference()
    {
        SharedPreferences sp = getReactApplicationContext().getSharedPreferences(myPref,0);
        String str = sp.getString("theMobileNo","EmptyKey");

        if(str != "EmptyKey" && str != "" && str != null)
            Toast.makeText(getReactApplicationContext(), "Number: " + str, Toast.LENGTH_SHORT).show();
        else
            Toast.makeText(getReactApplicationContext(), "Number not found, Please choose one", Toast.LENGTH_SHORT).show();
    }

    private String getNumberStr()
    {
        SharedPreferences sp = getReactApplicationContext().getSharedPreferences(myPref,0);
        String str = sp.getString("theMobileNo","EmptyKey");

        if(str != "EmptyKey" && str != "" && str != null)
            return str;
        else
            return "";
    }

    //Password protect
    @ReactMethod
    public void setPassword(String message) {
        writePassword(message);
    }

    @ReactMethod
    public void getPassword(Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke(readPassword());
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    private static final String myPref2 = "passwordPref__";
    private void writePassword(String thePreference)
    {
        SharedPreferences.Editor editor = getReactApplicationContext().getSharedPreferences(myPref2,0).edit();
        editor.putString("thePassword__", thePreference);
        editor.commit();

        SharedPreferences sp = getReactApplicationContext().getSharedPreferences(myPref2,0);
        String str = sp.getString("thePassword__","");

        if(str != "" && str != null)
            Toast.makeText(getReactApplicationContext(), "Password saved", Toast.LENGTH_SHORT).show();
        else
            Toast.makeText(getReactApplicationContext(), "Error! Password not saved", Toast.LENGTH_SHORT).show();
    }

    private String readPassword()
    {
        SharedPreferences sp = getReactApplicationContext().getSharedPreferences(myPref2,0);
        String str = sp.getString("thePassword__","");

        if(str != "" && str != null)
            return str;
        else
            return "";
    }

    @ReactMethod
    public void sayHi(Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke("Callback2 : Greetings from Java");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getNumber(Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke(getNumberStr());
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}