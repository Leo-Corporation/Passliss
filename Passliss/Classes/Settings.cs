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
using LeoCorpLibrary.Enums;
using Passliss.Enums;
using System;
using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Xml.Serialization;

namespace Passliss.Classes;

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

	/// <summary>
	/// True if Passliss should use the system's theme.
	/// </summary>
	public bool? IsThemeSystem { get; set; }

	/// <summary>
	/// The startup page of Passliss.
	/// </summary>
	public DefaultPage? StartupPage { get; set; }

	/// <summary>
	/// True if the history should be disabled.
	/// </summary>
	public bool? DisableHistory { get; set; }

	/// <summary>
	/// True if this is the first run of Passliss.
	/// </summary>
	public bool? IsFirstRun { get; set; }

	/// <summary>
	/// The default encryption algorithm in <see cref="Pages.EncryptPage"/>.
	/// </summary>
	public EncryptionAlgorithm? DefaultEncryptionAlgorithm { get; set; }

	/// <summary>
	/// True if Passliss should avoid special characters that may be hard for the user to type (ex: é,è,à,ñ).
	/// </summary>
	public bool? UseSimpleSpecialChars { get; set; }

	/// <summary>
	/// Contains all the user provided custom characters that can be used when generating a password.
	/// </summary>
	public string CustomUserChars { get; set; }

	/// <summary>
	/// True if Passliss should remember the custom characters provided by the user.
	/// </summary>
	public bool? SaveCustomChars { get; set; }

	/// <summary>
	/// Array of strings that contains the user-defined characters to use when generating a password.
	/// </summary>
	public string[] UserDefinedChars { get; set; }

	/// <summary>
	/// True if Passliss should use user defined chars instead of the default ones.
	/// </summary>
	public bool? UseUserDefinedCharacters { get; set; }

	/// <summary>
	/// True if Passliss should toggle the confidential mode on by default.
	/// </summary>
	public bool? UseConfidentialMode { get; set; }
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
				CheckUpdatesOnStart = false,
				NotifyUpdates = true,
				PasswordPreset = PasswordPresets.Simple,
				MinRandomLength = 10,
				MaxRandomLength = 30,
				UseRandomPasswordLengthOnStart = true,
				IsThemeSystem = true,
				StartupPage = DefaultPage.Generate,
				DisableHistory = false,
				IsFirstRun = true,
				DefaultEncryptionAlgorithm = EncryptionAlgorithm.AES,
				UseSimpleSpecialChars = false,
				CustomUserChars = "",
				SaveCustomChars = true,
				UserDefinedChars = new string[4] { Global.LowerCaseLetters, Global.UpperCaseLetters, Global.Numbers, Global.SpecialCaracters },
				UseUserDefinedCharacters = false,
				UseConfidentialMode = false
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
			XmlSerializer xmlSerializer = new(typeof(Settings)); // Create XML Serializer

			StreamWriter streamWriter = new(path); // The place where the file is going to be written
			xmlSerializer.Serialize(streamWriter, Global.Settings);

			streamWriter.Dispose();

			MessageBox.Show(Properties.Resources.SettingsExportedSucessMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show message
		}
		catch (Exception ex)
		{
			MessageBox.Show(ex.Message, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Error); // Show error message
		}
	}

	/// <summary>
	/// Imports settings.
	/// </summary>
	/// <param name="path">The path to the settings file.</param>
	public static void Import(string path)
	{
		try
		{
			if (File.Exists(path)) // If the file exist
			{
				XmlSerializer xmlSerializer = new(typeof(Settings)); // XML Serializer
				StreamReader streamReader = new(path); // Where the file is going to be read

				Global.Settings = (Settings)xmlSerializer.Deserialize(streamReader); // Read

				streamReader.Dispose();
				Save(); // Save
				MessageBox.Show(Properties.Resources.SettingsImportedMsg, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information); // Show error message

				// Restart app
				Process.Start(Directory.GetCurrentDirectory() + @"\Passliss.exe"); // Start app
				Environment.Exit(0); // Quit
			}
		}
		catch (Exception ex)
		{
			MessageBox.Show(ex.Message, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Error); // Show error message
		}
	}
}
