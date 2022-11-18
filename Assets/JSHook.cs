using Live2D.Cubism.Core;
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class JSHook : MonoBehaviour
{
    public TMP_Text stringText;
    public float a=8787;
    
    public float roll = 0, pitch = 0, yaw = 0;
    public float eye_L_value = 1, eye_R_value = 1;
    public float eyeball_x=0, eyeball_y=0;
    public float mar_clamped = 0;
    private string[] words;

    // Start is called before the first frame update
    void Start()
    {
        //GetJsData("-20.2123~-1.222~3.13123");
        roll = 0;
        pitch = 0;
        yaw = 0;
        eye_L_value = 1;
        eye_R_value = 1;

        eyeball_x = 0;
        eyeball_y = 0;

        mar_clamped = 0;
    }

    // Update is called once per frame
    void Update()
    { 

    }

    public void SetString(float value)
    {

        stringText.text = value.ToString();
        a = value;
        
        
        //ear_right = value;

        /* parameter = model.Parameters[4];
         parameter.Value = value;*/
    }

    public void GetJsData(string indata)
    {
        words = indata.Split('~');

        roll = float.Parse(words[0]);
        pitch = float.Parse(words[1]);
        yaw = float.Parse(words[2]);
        eye_L_value = float.Parse(words[3]);
        eye_R_value = float.Parse(words[4]);
        eyeball_x = float.Parse(words[5]);
        eyeball_y = float.Parse(words[6]);
        mar_clamped = float.Parse(words[7]);
        //stringText.text = roll.ToString() + " " + pitch.ToString() + " " + yaw.ToString();


    }



}
