﻿/*
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
using System.Windows;
using System.Xml.Serialization;

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

		/// <summary>
		/// The language of the app (country code). Can be _default, en-US, fr-FR...
		/// </summary>
		public string Language { get; set; }

		/// <summary>
		/// True if Passliss should check for updates on start.
		/// </summary>
		public bool? CheckUpdatesOnStart { get; set; }

		/// <summary>
		/// True if Passliss should notify the user when updates are available.
		/// </summary>
		public bool? NotifyUpdates { get; set; }

		/// <summary>
		/// Default Password preset.
		/// </summary>
		public PasswordPresets? PasswordPreset { get; set; }

		/// <summary>
		/// The minimum random password length.
		/// </summary>
		public int? MinRandomLength { get; set; }

		/// <summary>
		/// The maximum random password length.
		/// </summary>
		public int? MaxRandomLength { get; set; }

		/// <summary>
		/// True if Passliss should use a random length for the generated password.
		/// </summary>
		public bool? UseRandomPasswordLengthOnStart { get; set; }
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
				XmlSerializer xmlSerializer = new(typeof(Settings)); // XML Serializer
				StreamReader streamReader = new(path); // Where the file is going to be read

				Global.Settings = (Settings)xmlSerializer.Deserialize(streamReader); // Read

				streamReader.Dispose();
			}
			else
			{
				Global.Settings = new Settings
				{
					IsDarkTheme = false,
					Language = "_default",
					CheckUpdatesOnStart = true,
					NotifyUpdates = true,
					PasswordPreset = PasswordPresets.Simple,
					MinRandomLength = 10,
					MaxRandomLength = 30,
					UseRandomPasswordLengthOnStart = true
				}; // Create a new settings file

				Save(); // Save the changes
			}
		}

		/// <summary>
		/// Saves Passliss settings.
		/// </summary>
		public static void Save()
		{
			string path = Env.AppDataPath + @"\Passliss\Settings.xml"; // The path of the settings file

			XmlSerializer xmlSerializer = new(typeof(Settings)); // Create XML Serializer

			if (!Directory.Exists(Env.AppDataPath + @"\Passliss")) // If the directory doesn't exist
			{
				Directory.CreateDirectory(Env.AppDataPath + @"\Passliss"); // Create the directory
			}

			StreamWriter streamWriter = new(path); // The place where the file is going to be written
			xmlSerializer.Serialize(streamWriter, Global.Settings);

			streamWriter.Dispose();
		}

		/// <summary>
		/// Exports current settings.
		/// </summary>
		/// <param name="path">The path where the settings file should be exported.</param>
		public static void Export(string path)
		{
			try
			{
				XmlSerializer xmlSerializer = new XmlSerializer(typeof(Settings)); // Create XML Serializer

				StreamWriter streamWriter = new StreamWriter(path); // The place where the file is going to be written
				xmlSerializer.Serialize(streamWriter, Global.Settings);

				streamWriter.Dispose();

				MessageBox.Show(Properties.Resources.SettingsExportedSucessMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
			}
			catch (Exception ex)
			{
				MessageBox.Show(ex.Message, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Error); // Show error message
			}
		}
	}
}
