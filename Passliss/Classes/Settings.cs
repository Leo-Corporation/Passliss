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
