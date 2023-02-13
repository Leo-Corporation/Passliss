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
using Microsoft.Win32;
using Passliss.Enums;
using Passliss.Extensions;
using Passliss.Pages;
using PeyrSharp.Core;
using PeyrSharp.Enums;
using PeyrSharp.Env;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media;
using System.Windows.Shell;

namespace Passliss.Classes;

/// <summary>
/// The <see cref="Global"/> class contains various methods and properties.
/// </summary>
public static class Global
{
	/// <summary>
	/// The <see cref="Pages.GeneratePage"/>.
	/// </summary>
	public static GeneratePage GeneratePage { get; set; }

	/// <summary>
	/// The <see cref="Pages.SettingsPage"/>.
	/// </summary>
	public static SettingsPage SettingsPage { get; set; }

	/// <summary>
	/// The <see cref="Pages.StrenghtPage"/>.
	/// </summary>
	public static StrenghtPage StrenghtPage { get; set; }

	/// <summary>
	/// The <see cref="Pages.EncryptPage"/>.
	/// </summary>
	public static EncryptPage EncryptPage { get; set; }

	/// <summary>
	/// Lower case letters.
	/// </summary>
	public static string LowerCaseLetters => "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

	/// <summary>
	/// Upper case letters.
	/// </summary>
	public static string UpperCaseLetters => "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";

	/// <summary>
	/// Numbers.
	/// </summary>
	public static string Numbers => "0,1,2,3,4,5,6,7,8,8,9";

	private static string _specialChars = ";,:,!,/,§,ù,*,$,%,µ,£,),=,+,*,-,&,é,',(,-,è,_,ç,<,>,?,^,¨";
	/// <summary>
	/// Special caracters.
	/// </summary>
	public static string SpecialCaracters
	{
		get { return _specialChars; }
		set { _specialChars = value; }
	}

	public static string[] ForbidenCaracters => new string[] { "123", "456", "789", "password", "mdp", "pswr", "000", "admin", "111", "222", "333", "444", "555", "666", "777", "888", "999" };

	/// <summary>
	/// Settings of Passliss.
	/// </summary>
	public static Settings Settings { get; set; }

	/// <summary>
	/// List of the available languages.
	/// </summary>
	public static List<string> LanguageList => new() { "English (United States)", "Français (France)", "中文（简体）" };

	/// <summary>
	/// List of the available languages codes.
	/// </summary>
	public static List<string> LanguageCodeList => new() { "en-US", "fr-FR", "zh-CN" };

	/// <summary>
	/// The current version of Passliss.
	/// </summary>
	public static string Version => "2.8.0.2212";

	/// <summary>
	/// GitHub link for the last version (<see cref="string"/>).
	/// </summary>
	public static string LastVersionLink => "https://raw.githubusercontent.com/Leo-Corporation/LeoCorp-Docs/master/Liens/Update%20System/Passliss/Version.txt";

	/// <summary>
	/// Password configurations.
	/// </summary>
	public static List<PasswordConfiguration> PasswordConfigurations { get; set; }

	/// <summary>
	/// The default <see cref="PasswordConfiguration"/>.
	/// </summary>
	public static PasswordConfiguration DefaultPasswordConfiguration { get; set; }

	/// <summary>
	/// <see langword="true"/> if confidential mode is enabled.
	/// </summary>
	public static bool IsConfidentialModeEnabled { get; set; }

	/// <summary>
	/// Changes the application's theme.
	/// </summary>
	public static void ChangeTheme()
	{
		Application.Current.Resources.MergedDictionaries.Clear(); // Clear all resources
		ResourceDictionary resourceDictionary = new(); // Create a resource dictionary

		if (!Settings.IsThemeSystem.HasValue)
		{
			Settings.IsThemeSystem = false;
		}

		if (Settings.IsThemeSystem.Value)
		{
			Settings.IsDarkTheme = IsSystemThemeDark(); // Set
		}

		if (Settings.IsDarkTheme) // If the dark theme is on
		{
			resourceDictionary.Source = new Uri("..\\Themes\\Dark.xaml", UriKind.Relative); // Add source
		}
		else
		{
			resourceDictionary.Source = new Uri("..\\Themes\\Light.xaml", UriKind.Relative); // Add source
		}

		Application.Current.Resources.MergedDictionaries.Add(resourceDictionary); // Add the dictionary
	}

	public static bool IsSystemThemeDark()
	{
		if (Sys.CurrentWindowsVersion != WindowsVersion.Windows10 && Sys.CurrentWindowsVersion != WindowsVersion.Windows11)
		{
			return false; // Avoid errors on older OSs
		}

		var t = Registry.GetValue(@"HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize", "SystemUsesLightTheme", "1");
		return t switch
		{
			0 => true,
			1 => false,
			_ => false
		}; // Return
	}

	/// <summary>
	/// Gets the "Hi" sentence message.
	/// </summary>
	public static string GetHiSentence
	{
		get
		{
			if (DateTime.Now.Hour >= 21 && DateTime.Now.Hour <= 7) // If between 9PM & 7AM
			{
				return Properties.Resources.GoodNight + ", " + Environment.UserName + "."; // Return the correct value
			}
			else if (DateTime.Now.Hour >= 7 && DateTime.Now.Hour <= 12) // If between 7AM - 12PM
			{
				return Properties.Resources.Hi + ", " + Environment.UserName + "."; // Return the correct value
			}
			else if (DateTime.Now.Hour >= 12 && DateTime.Now.Hour <= 17) // If between 12PM - 5PM
			{
				return Properties.Resources.GoodAfternoon + ", " + Environment.UserName + "."; // Return the correct value
			}
			else if (DateTime.Now.Hour >= 17 && DateTime.Now.Hour <= 21) // If between 5PM - 9PM
			{
				return Properties.Resources.GoodEvening + ", " + Environment.UserName + "."; // Return the correct value
			}
			else
			{
				return Properties.Resources.Hi + ", " + Environment.UserName + "."; // Return the correct value
			}
		}
	}

	/// <summary>
	/// Gets the final caracters that will be present in the password.
	/// </summary>
	/// <param name="lC">Include lower cases.</param>
	/// <param name="uC">Include upper cases.</param>
	/// <param name="n">Include numbers.</param>
	/// <param name="sC">Include special caracters.</param>
	/// <returns>A <see cref="string"/> value.</returns>
	public static string GetFinalCaracters(bool lC, bool uC, bool n, bool sC)
	{
		string finalCaracters = "";

		if (lC) // If include lower cases
		{
			finalCaracters += Settings.UseUserDefinedCharacters ?? false ? Settings.UserDefinedChars[0] : LowerCaseLetters + ","; // Add lower cases
		}

		if (uC) // If include upper cases
		{
			finalCaracters += Settings.UseUserDefinedCharacters ?? false ? Settings.UserDefinedChars[1] : UpperCaseLetters + ","; // Add upper cases
		}

		if (n) // If include numbers
		{
			finalCaracters += Settings.UseUserDefinedCharacters ?? false ? Settings.UserDefinedChars[2] : Numbers + ","; // Add numbers
		}

		if (sC) // If include special caracters
		{
			finalCaracters += Settings.UseUserDefinedCharacters ?? false ? Settings.UserDefinedChars[3] : SpecialCaracters + ","; // Add special caracters
		}

		return finalCaracters; // Return result
	}

	/// <summary>
	/// Gets the password strenght of a password.
	/// </summary>
	/// <param name="password">The password.</param>
	/// <returns>A <see cref="PasswordStrenght"/> enum.</returns>
	public static PasswordStrenght GetPasswordStrenght(string password)
	{
		int lenght = password.Length; // Lenght
		int pswrScore = 0; // Score

		if (lenght == 0)
		{
			return PasswordStrenght.Unknown;
		}

		if (lenght >= 0 && lenght <= 5) // If the lenght of the password is between 0 & 5
		{
			pswrScore += 1; // Add 1
		}
		else if (lenght >= 6 && lenght <= 10) // If the lenght of the password is between 6 & 10
		{
			pswrScore += 2; // Add 2
		}
		else if (lenght >= 11 && lenght <= 15) // If the lenght of the password is between 11 & 15
		{
			pswrScore += 5; // Add 5
		}
		else if (lenght > 15) // If the lenght of the password is higher than 15
		{
			pswrScore += 10; // Add 10
		}

		for (int i = 0; i < Numbers.Length; i++)
		{
			for (int j = 0; j < lenght; j++)
			{
				pswrScore += password[j].ToString().Contains(Numbers[i]) ? 1 : 0;
			}
		}

		for (int i = 0; i < SpecialCaracters.Length; i++)
		{
			for (int j = 0; j < lenght; j++)
			{
				pswrScore += password[j].ToString().Contains(SpecialCaracters[i]) ? 4 : 0;
			}
		}

		for (int i = 0; i < ForbidenCaracters.Length; i++)
		{
			pswrScore -= password.Contains(ForbidenCaracters[i]) ? 10 : 0;
		}

		if (password.ContainsLowerCases() && password.ContainsUpperCases()) // If there is upper and lower cases
		{
			pswrScore += 2; // Add 2
		}
		else
		{
			pswrScore -= 5; // Sub 5
		}

		if (password.HasRepeatedCaracters())
		{
			pswrScore -= 5; // Sub 5
		}

		if (pswrScore < 3)
		{
			return PasswordStrenght.Low; // Return
		}
		else if (pswrScore >= 3 && pswrScore <= 7)
		{
			return PasswordStrenght.Medium; // Return
		}
		else if (pswrScore >= 8 && pswrScore <= 12)
		{
			return PasswordStrenght.Good; // Return
		}
		else if (pswrScore >= 13)
		{
			return PasswordStrenght.VeryGood; // Return
		}
		else
		{
			return PasswordStrenght.Good; // Return
		}
	}

	/// <summary>
	/// Gets the color depending of a <see cref="PasswordStrenght"/>.
	/// </summary>
	/// <param name="passwordStrenght">The strenght of a password.</param>
	/// <returns>A <see cref="SolidColorBrush"/> value.</returns>
	public static SolidColorBrush GetStrenghtColorBrush(PasswordStrenght passwordStrenght)
	{
		return passwordStrenght switch
		{
			PasswordStrenght.VeryGood => new SolidColorBrush { Color = Color.FromRgb(0, 191, 7) }, // Return
			PasswordStrenght.Good => new SolidColorBrush { Color = Color.FromRgb(104, 234, 0) }, // Return
			PasswordStrenght.Medium => new SolidColorBrush { Color = Color.FromRgb(255, 123, 0) }, // Return
			PasswordStrenght.Low => new SolidColorBrush { Color = Color.FromRgb(255, 0, 0) }, // Return
			_ => new SolidColorBrush { Color = (Color)ColorConverter.ConvertFromString(Application.Current.Resources["Gray"].ToString()) }, // Return
		};
	}

	public static void ChangeLanguage()
	{
		switch (Settings.Language) // For each case
		{
			case "_default": // No language
				break;
			case "en-US": // English (US)
				Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("en-US"); // Change
				break;

			case "fr-FR": // French (FR)
				Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("fr-FR"); // Change
				break;

			case "zh-CN": // Chinese (CN)
				Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("zh-CN"); // Change
				break;
			default: // No language
				break;
		}
	}

	public static Color GetColorFromResource(string resourceName)
	{
		return (Color)ColorConverter.ConvertFromString(Application.Current.Resources[resourceName].ToString());
	}

	internal static void CreateJumpLists()
	{
		JumpList jumpList = new(); // Create a jump list

		jumpList.JumpItems.Add(new JumpTask
		{
			Title = Properties.Resources.Generate,
			Arguments = "/page 0",
			Description = Properties.Resources.WelcomeGenerate,
			CustomCategory = Properties.Resources.Tasks,
			IconResourcePath = Assembly.GetEntryAssembly().Location
		}); // Add Generate jump task

		jumpList.JumpItems.Add(new JumpTask
		{
			Title = Properties.Resources.Strenght,
			Arguments = "/page 1",
			Description = Properties.Resources.WelcomeTestStrength,
			CustomCategory = Properties.Resources.Tasks,
			IconResourcePath = Assembly.GetEntryAssembly().Location
		}); // Add Strength jump task

		jumpList.JumpItems.Add(new JumpTask
		{
			Title = Properties.Resources.Encrypt,
			Arguments = "/page 2",
			Description = Properties.Resources.WelcomeEncrypt,
			CustomCategory = Properties.Resources.Tasks,
			IconResourcePath = Assembly.GetEntryAssembly().Location
		}); // Add Encrypt jump task

		jumpList.ShowRecentCategory = false; // Hide the recent category
		jumpList.ShowFrequentCategory = false; // Hide the frequent category

		JumpList.SetJumpList(Application.Current, jumpList); // Set the jump list
	}

	public static string GetStrenghtCaracter(PasswordStrenght passwordStrenght) => passwordStrenght switch
	{
		PasswordStrenght.VeryGood => "\uF6EA", // If the password strenght is very good
		PasswordStrenght.Good => "\uF299", // If the password strenght is good
		PasswordStrenght.Medium => "\uF882", // If the password strenght is medium
		PasswordStrenght.Low => "\uF36E", // If the password strenght is low
		_ => "\uF4AB" // If the password strenght is unknown
	};

	public static string GetStrenghtText(PasswordStrenght passwordStrenght) => passwordStrenght switch
	{
		PasswordStrenght.VeryGood => Properties.Resources.StrenghtVeryGood, // If the password strenght is very good
		PasswordStrenght.Good => Properties.Resources.StrenghtGood, // If the password strenght is good
		PasswordStrenght.Medium => Properties.Resources.StrenghtMedium, // If the password strenght is medium
		PasswordStrenght.Low => Properties.Resources.StrenghtLow, // If the password strenght is low
		_ => Properties.Resources.EnterPassword // If the password strenght is unknown
	};

	public static async Task<string> GeneratePasswordByStrength(PasswordStrength passwordStrength) => passwordStrength switch
	{
		PasswordStrength.Low => await Password.GenerateAsync(9, GetFinalCaracters(true, true, false, false), ","),
		PasswordStrength.Medium => await Password.GenerateAsync(12, GetFinalCaracters(true, true, true, false), ","),
		PasswordStrength.Good => await Password.GenerateAsync(19, GetFinalCaracters(true, true, true, false), ","),
		PasswordStrength.VeryGood => await Password.GenerateAsync(20, GetFinalCaracters(true, true, true, true), ","),
		_ => await Password.GenerateAsync(9, GetFinalCaracters(true, true, false, false), ","),
	};

	public static async Task<List<string>> GeneratePasswordByStrength(int amount, PasswordStrength passwordStrength) => passwordStrength switch
	{
		PasswordStrength.Low => await Password.GenerateAsync(amount, 9, GetFinalCaracters(true, true, false, false), ","),
		PasswordStrength.Medium => await Password.GenerateAsync(amount, 12, GetFinalCaracters(true, true, true, false), ","),
		PasswordStrength.Good => await Password.GenerateAsync(amount, 19, GetFinalCaracters(true, true, true, false), ","),
		PasswordStrength.VeryGood => await Password.GenerateAsync(amount, 20, GetFinalCaracters(true, true, true, true), ","),
		_ => await Password.GenerateAsync(amount, 9, GetFinalCaracters(true, true, false, false), ","),
	};
}

public record ColorSyntaxItem(char Character, Color Color);