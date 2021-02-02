/*
MIT License

Copyright (c) Léo Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
using LeoCorpLibrary;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Passliss.Classes
{
    /// <summary>
    /// Settings of Passliss
    /// </summary>
    public class Settings
    {
        /// <summary>
        /// True if the theme of Passliss is set to dark.
        /// </summary>
        public bool IsDarkTheme { get; set; }
    }

    /// <summary>
    /// Class that contains methods that can manage Passliss' settings.
    /// </summary>
    public static class SettingsManager
    {
        /// <summary>
        /// Loads Passliss settings.
        /// </summary>
        public static void Load()
        {
            string path = Env.AppDataPath + @"\Passliss\Settings.xml"; // The path of the settings file

            if (File.Exists(path)) // If the file exist
            {
                //TODO
            }
            else
            {
                Global.Settings = new Settings { IsDarkTheme = false }; // Create a new settings file

                //TODO
            }
        }

        /// <summary>
        /// Saves Passliss settings.
        /// </summary>
        public static void Save()
        {
            //TODO
        }
    }
}
