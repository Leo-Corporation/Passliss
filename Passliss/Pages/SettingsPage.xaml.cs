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
using Microsoft.Win32;
using Passliss.Classes;
using Passliss.Enums;
using System;
using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace Passliss.Pages;

/// <summary>
/// Logique d'interaction pour SettingsPage.xaml
/// </summary>
public partial class SettingsPage : Page
{
	bool isAvailable;
	readonly System.Windows.Forms.NotifyIcon notifyIcon = new();
	public SettingsPage()
	{
		InitializeComponent();
		notifyIcon.Icon = System.Drawing.Icon.ExtractAssociatedIcon(AppDomain.CurrentDomain.BaseDirectory + @"\Passliss.exe");
		notifyIcon.BalloonTipClicked += async (o, e) =>
		{
			string lastVersion = await Update.GetLastVersionAsync(Global.LastVersionLink); // Get last version
			if (MessageBox.Show(Properties.Resources.InstallConfirmMsg, $"{Properties.Resources.InstallVersion} {lastVersion}", MessageBoxButton.YesNo, MessageBoxImage.Information) == MessageBoxResult.Yes)
			{
				Env.ExecuteAsAdmin(Directory.GetCurrentDirectory() + @"\Xalyus Updater.exe"); // Start the updater
				Environment.Exit(0); // Close
			}
		};
		InitUI(); // Init the UI
	}

	internal async void InitUI()
	{
		if (!Global.Settings.IsThemeSystem.HasValue)
		{
			Global.Settings.IsThemeSystem = false; // Set
		}

		// Load
		if (Global.Settings.StartupPage is null) // If the value is null
		{
			Global.Settings.StartupPage = DefaultPage.Generate; // Set default value
		}

		if (!Global.Settings.HidePasswordInStrengthPage.HasValue)
		{
			Global.Settings.HidePasswordInStrengthPage = false; // Set to default value
		}

		if (!Global.Settings.AlwaysHidePasswordInHistory.HasValue)
		{
			Global.Settings.AlwaysHidePasswordInHistory = false; // Set to default value
		}

		if (!Global.Settings.DisableHistory.HasValue)
		{
			Global.Settings.DisableHistory = false; // Set
		}

		if (!Global.Settings.IsFirstRun.HasValue)
		{
			Global.Settings.IsFirstRun = true; // Set
		}

		if (!Global.Settings.DefaultEncryptionAlgorithm.HasValue)
		{
			Global.Settings.DefaultEncryptionAlgorithm = EncryptionAlgorithm.AES; // Set
		}

		if (!Global.Settings.UseSimpleSpecialChars.HasValue)
		{
			Global.Settings.UseSimpleSpecialChars = false; // Set
		}

		// Load RadioButtons
		DarkRadioBtn.IsChecked = Global.Settings.IsDarkTheme; // Change IsChecked property
		LightRadioBtn.IsChecked = !Global.Settings.IsDarkTheme; // Change IsChecked property
		SystemRadioBtn.IsChecked = Global.Settings.IsThemeSystem; // Change IsChecked property

		switch (Global.Settings.StartupPage)
		{
			case DefaultPage.Generate:
				GeneratePageRadioBtn.IsChecked = true;
				break;
			case DefaultPage.Strength:
				StrengthPageRadioBtn.IsChecked = true;
				break;
			case DefaultPage.Encryption:
				EncryptionPageRadioBtn.IsChecked = true;
				break;
		}

		HidePasswordInStrengthChk.IsChecked = Global.Settings.HidePasswordInStrengthPage; // Set
		HidePasswordInHistoryChk.IsChecked = Global.Settings.AlwaysHidePasswordInHistory; // Set

		// Borders
		if (DarkRadioBtn.IsChecked.Value)
		{
			CheckedBorder = DarkBorder; // Set
		}
		else if (LightRadioBtn.IsChecked.Value)
		{
			CheckedBorder = LightBorder; // Set
		}
		else if (SystemRadioBtn.IsChecked.Value)
		{
			CheckedBorder = SystemBorder; // Set
		}
		RefreshBorders();

		if (GeneratePageRadioBtn.IsChecked.Value)
		{
			CheckedBorder2 = GeneratePageBorder; // Set
		}
		else if (StrengthPageRadioBtn.IsChecked.Value)
		{
			CheckedBorder2 = StrengthPageBorder; // Set
		}
		else if (EncryptionPageRadioBtn.IsChecked.Value)
		{
			CheckedBorder2 = EncryptionPageBorder; // Set
		}
		RefreshBordersPage(); // Refresh

		// Load checkboxes
		CheckUpdatesOnStartChk.IsChecked = Global.Settings.CheckUpdatesOnStart ?? true; // Set
		NotifyUpdatesChk.IsChecked = Global.Settings.NotifyUpdates ?? true; // Set
		RandomLengthOnStartChk.IsChecked = Global.Settings.UseRandomPasswordLengthOnStart ?? true; // Set
		DisableHistoryChk.IsChecked = Global.Settings.DisableHistory ?? false; // Set
		UseSimplerCharsChk.IsChecked = Global.Settings.UseSimpleSpecialChars ?? false; // Set

		// Load LangComboBox
		LangComboBox.Items.Clear(); // Clear
		LangComboBox.Items.Add(Properties.Resources.Default); // Add "default"

		for (int i = 0; i < Global.LanguageList.Count; i++)
		{
			LangComboBox.Items.Add(Global.LanguageList[i]);
		}

		// AlogrithmComboBox
		AlgorithmComboBox.SelectedIndex = (int)Global.Settings.DefaultEncryptionAlgorithm.Value;

		LangComboBox.SelectedIndex = (Global.Settings.Language == "_default") ? 0 : Global.LanguageCodeList.IndexOf(Global.Settings.Language) + 1;

		// Random TextBoxes
		MinLengthTxt.Text = Global.Settings.MinRandomLength.HasValue ? Global.Settings.MinRandomLength.Value.ToString() : "10"; // Set
		MaxLengthTxt.Text = Global.Settings.MaxRandomLength.HasValue ? Global.Settings.MaxRandomLength.Value.ToString() : "30"; // Set

		if (!Global.Settings.MinRandomLength.HasValue)
		{
			Global.Settings.MinRandomLength = int.Parse(MinLengthTxt.Text); // Set
		}

		if (!Global.Settings.MaxRandomLength.HasValue)
		{
			Global.Settings.MaxRandomLength = int.Parse(MaxLengthTxt.Text); // Set
		}

		SettingsManager.Save();

		// Apply buttons
		LangApplyBtn.Visibility = Visibility.Hidden; // Hide
		ThemeApplyBtn.Visibility = Visibility.Hidden; // Hide
		RandomLengthApplyBtn.Visibility = Visibility.Hidden; // Hide

		// Update the UpdateStatusTxt
		if (Global.Settings.CheckUpdatesOnStart.Value)
		{
			if (await NetworkConnection.IsAvailableAsync())
			{
				isAvailable = Update.IsAvailable(Global.Version, await Update.GetLastVersionAsync(Global.LastVersionLink));

				UpdateStatusTxt.Text = isAvailable ? Properties.Resources.AvailableUpdates : Properties.Resources.UpToDate; // Set the text
				InstallIconTxt.Text = isAvailable ? "\uE9EA" : "\uE92A"; // Set text 
				InstallMsgTxt.Text = isAvailable ? Properties.Resources.Install : Properties.Resources.CheckUpdate; // Set text 

				if (isAvailable && Global.Settings.NotifyUpdates.Value)
				{
					notifyIcon.Visible = true; // Show
					notifyIcon.ShowBalloonTip(5000, Properties.Resources.Passliss, Properties.Resources.AvailableUpdates, System.Windows.Forms.ToolTipIcon.Info);
					notifyIcon.Visible = false; // Hide
				}
			}
			else
			{
				UpdateStatusTxt.Text = Properties.Resources.UnableToCheckUpdates; // Set text
				InstallMsgTxt.Text = Properties.Resources.CheckUpdate; // Set text
				InstallIconTxt.Text = "\uE92A"; // Set text 
			}
		}
		else
		{
			UpdateStatusTxt.Text = Properties.Resources.CheckUpdatesDisabledOnStart; // Set text
			InstallMsgTxt.Text = Properties.Resources.CheckUpdate; // Set text
			InstallIconTxt.Text = "\uE92A"; // Set text 
			UpdateStatusPanel.Orientation = Orientation.Vertical; // Set orientation
		}

		VersionTxt.Text = Global.Version; // Set text
	}

	private void ThemeApplyBtn_Click(object sender, RoutedEventArgs e)
	{
		Global.Settings.IsDarkTheme = DarkRadioBtn.IsChecked.Value; // Set the settings
		Global.Settings.IsThemeSystem = SystemRadioBtn.IsChecked.Value; // Set the settings
		SettingsManager.Save(); // Save the changes
		ThemeApplyBtn.Visibility = Visibility.Hidden; // Hide
		DisplayRestartMessage();
	}

	private void LangApplyBtn_Click(object sender, RoutedEventArgs e)
	{
		Global.Settings.Language = LangComboBox.Text switch
		{
			"English (United States)" => Global.LanguageCodeList[0], // Set the settings value
			"Français (France)" => Global.LanguageCodeList[1], // Set the settings value
			"中文（简体）" => Global.LanguageCodeList[2], // Set the settings value
			_ => "_default" // Set the settings value
		};
		SettingsManager.Save(); // Save the changes
		LangApplyBtn.Visibility = Visibility.Hidden; // Hide
		DisplayRestartMessage();
	}

	private void ThemeComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
	{
		ThemeApplyBtn.Visibility = Visibility.Visible; // Visible
	}

	private void LangComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
	{
		LangApplyBtn.Visibility = Visibility.Visible; // Visible
	}

	/// <summary>
	/// Restarts Passliss.
	/// </summary>
	private static void DisplayRestartMessage()
	{
		if (MessageBox.Show(Properties.Resources.NeedRestartToApplyChanges, Properties.Resources.Passliss, MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
		{
			Process.Start(Directory.GetCurrentDirectory() + @"\Passliss.exe"); // Start
			Environment.Exit(0); // Close
		}
	}

	private async void RefreshInstallBtn_Click(object sender, RoutedEventArgs e)
	{
		if (isAvailable) // If there is updates
		{
			string lastVersion = await Update.GetLastVersionAsync(Global.LastVersionLink); // Get last version
			if (MessageBox.Show(Properties.Resources.InstallConfirmMsg, $"{Properties.Resources.InstallVersion} {lastVersion}", MessageBoxButton.YesNo, MessageBoxImage.Information) == MessageBoxResult.Yes)
			{
				Env.ExecuteAsAdmin(Directory.GetCurrentDirectory() + @"\Xalyus Updater.exe"); // Start the updater
				Environment.Exit(0); // Close
			}
		}
		else
		{
			if (await NetworkConnection.IsAvailableAsync())
			{
				// Update the UpdateStatusTxt
				isAvailable = Update.IsAvailable(Global.Version, await Update.GetLastVersionAsync(Global.LastVersionLink));

				UpdateStatusTxt.Text = isAvailable ? Properties.Resources.AvailableUpdates : Properties.Resources.UpToDate; // Set the text
				InstallIconTxt.Text = isAvailable ? "\uE9EA" : "\uE92A"; // Set text 
				InstallMsgTxt.Text = isAvailable ? Properties.Resources.Install : Properties.Resources.CheckUpdate; // Set text 

				if (isAvailable && Global.Settings.NotifyUpdates.Value)
				{
					notifyIcon.Visible = true; // Show
					notifyIcon.ShowBalloonTip(5000, Properties.Resources.Passliss, Properties.Resources.AvailableUpdates, System.Windows.Forms.ToolTipIcon.Info);
					notifyIcon.Visible = false; // Hide
				}
			}
			else
			{
				UpdateStatusTxt.Text = Properties.Resources.UnableToCheckUpdates; // Set text
				InstallMsgTxt.Text = Properties.Resources.CheckUpdate; // Set text
				InstallIconTxt.Text = "\uE92A"; // Set text 
			}

			UpdateStatusPanel.Orientation = Orientation.Horizontal;
		}
	}

	private void LightRadioBtn_Checked(object sender, RoutedEventArgs e)
	{
		ThemeApplyBtn.Visibility = Visibility.Visible; // Show the ThemeApplyBtn button
	}

	private void DarkRadioBtn_Checked(object sender, RoutedEventArgs e)
	{
		ThemeApplyBtn.Visibility = Visibility.Visible; // Show the ThemeApplyBtn button
	}

	private void CheckUpdatesOnStartChk_Checked(object sender, RoutedEventArgs e)
	{
		Global.Settings.CheckUpdatesOnStart = CheckUpdatesOnStartChk.IsChecked; // Set
		SettingsManager.Save(); // Save changes
	}

	private void NotifyUpdatesChk_Checked(object sender, RoutedEventArgs e)
	{
		Global.Settings.NotifyUpdates = NotifyUpdatesChk.IsChecked; // Set
		SettingsManager.Save(); // Save changes
	}

	private void RandomLengthApplyBtn_Click(object sender, RoutedEventArgs e)
	{
		if (!string.IsNullOrEmpty(MinLengthTxt.Text) && !string.IsNullOrWhiteSpace(MinLengthTxt.Text) && !string.IsNullOrEmpty(MaxLengthTxt.Text) && !string.IsNullOrWhiteSpace(MaxLengthTxt.Text))
		{
			if (int.Parse(MinLengthTxt.Text) < int.Parse(MaxLengthTxt.Text))
			{
				Global.Settings.MinRandomLength = int.Parse(MinLengthTxt.Text); // Set
				Global.Settings.MaxRandomLength = int.Parse(MaxLengthTxt.Text); // Set

				SettingsManager.Save(); // Save changes 

				RandomLengthApplyBtn.Visibility = Visibility.Hidden; // Hide
			}
			else
			{
				MessageBox.Show(Properties.Resources.ValuesIncorrect, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
			}
		}
		else
		{
			MessageBox.Show(Properties.Resources.ValuesIncorrect, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
		}
	}

	private void MinLengthTxt_TextChanged(object sender, TextChangedEventArgs e)
	{
		RandomLengthApplyBtn.Visibility = Visibility.Visible; // Show
	}

	private void MaxLengthTxt_TextChanged(object sender, TextChangedEventArgs e)
	{
		RandomLengthApplyBtn.Visibility = Visibility.Visible; // Show
	}

	private void RandomLengthOnStartChk_Checked(object sender, RoutedEventArgs e)
	{
		Global.Settings.UseRandomPasswordLengthOnStart = RandomLengthOnStartChk.IsChecked; // Set value

		SettingsManager.Save(); // Save
	}

	private void ImportBtn_Click(object sender, RoutedEventArgs e)
	{
		OpenFileDialog openFileDialog = new()
		{
			Filter = "XML|*.xml",
			Title = Properties.Resources.ImportSettings
		}; // Create file dialog

		if (openFileDialog.ShowDialog() ?? true)
		{
			SettingsManager.Import(openFileDialog.FileName); // Import games
		}
	}

	private void ExportBtn_Click(object sender, RoutedEventArgs e)
	{
		SaveFileDialog saveFileDialog = new()
		{
			FileName = "PasslissSettings.xml",
			Filter = "XML|*.xml",
			Title = Properties.Resources.ExportSettings
		}; // Create file dialog

		if (saveFileDialog.ShowDialog() ?? true)
		{
			SettingsManager.Export(saveFileDialog.FileName); // Export games
		}
	}

	private void BtnEnter(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button
		button.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("WindowButtonsHoverForeground1") }; // Set the foreground
	}

	private void BtnLeave(object sender, MouseEventArgs e)
	{
		Button button = (Button)sender; // Create button
		button.Foreground = new SolidColorBrush { Color = Global.GetColorFromResource("Foreground1") }; // Set the foreground 
	}

	private void SystemRadioBtn_Checked(object sender, RoutedEventArgs e)
	{
		ThemeApplyBtn.Visibility = Visibility.Visible; // Show the ThemeApplyBtn button
	}

	Border CheckedBorder { get; set; }
	private void Border_MouseEnter(object sender, MouseEventArgs e)
	{
		Border border = (Border)sender;
		border.BorderBrush = new SolidColorBrush() { Color = Global.GetColorFromResource("AccentColor") }; // Set color
	}

	private void Border_MouseLeave(object sender, MouseEventArgs e)
	{
		Border border = (Border)sender;
		if (border != CheckedBorder)
		{
			border.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color 
		}

	}

	private void LightBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
	{
		LightRadioBtn.IsChecked = true; // Set IsChecked
		CheckedBorder = LightBorder; // Set
		RefreshBorders();
	}

	private void DarkBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
	{
		DarkRadioBtn.IsChecked = true; // Set IsChecked
		CheckedBorder = DarkBorder; // Set
		RefreshBorders();
	}

	private void SystemBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
	{
		SystemRadioBtn.IsChecked = true; // Set IsChecked
		CheckedBorder = SystemBorder; // Set
		RefreshBorders();
	}

	private void RefreshBorders()
	{
		LightBorder.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color 
		DarkBorder.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color 
		SystemBorder.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color 

		CheckedBorder.BorderBrush = new SolidColorBrush() { Color = Global.GetColorFromResource("AccentColor") }; // Set color
	}

	Border CheckedBorder2 { get; set; }

	private void RefreshBordersPage()
	{
		GeneratePageBorder.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color 
		StrengthPageBorder.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color
		EncryptionPageBorder.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color

		CheckedBorder2.BorderBrush = new SolidColorBrush() { Color = Global.GetColorFromResource("AccentColor") }; // Set color
	}
	private void GeneratePageRadioBtn_Checked(object sender, RoutedEventArgs e)
	{
		CheckedBorder2 = GeneratePageBorder; // Set
		GeneratePageRadioBtn.IsChecked = true;
		RefreshBordersPage(); // Refresh

		Global.Settings.StartupPage = DefaultPage.Generate; // Update
		SettingsManager.Save(); // Save changes
	}

	private void StrengthPageRadioBtn_Checked(object sender, RoutedEventArgs e)
	{
		CheckedBorder2 = StrengthPageBorder; // Set
		StrengthPageRadioBtn.IsChecked = true;
		RefreshBordersPage(); // Refresh

		Global.Settings.StartupPage = DefaultPage.Strength; // Update
		SettingsManager.Save(); // Save changes
	}

	private void Border_MouseEnter_1(object sender, MouseEventArgs e)
	{
		Border border = (Border)sender;
		border.BorderBrush = new SolidColorBrush() { Color = Global.GetColorFromResource("AccentColor") }; // Set color
	}

	private void Border_MouseLeave_1(object sender, MouseEventArgs e)
	{
		Border border = (Border)sender;
		if (border != CheckedBorder2)
		{
			border.BorderBrush = new SolidColorBrush() { Color = Colors.Transparent }; // Set color 
		}
	}

	private void GeneratePageBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
	{
		CheckedBorder2 = GeneratePageBorder; // Set
		GeneratePageRadioBtn.IsChecked = true;
		RefreshBordersPage(); // Refresh

		Global.Settings.StartupPage = DefaultPage.Generate; // Update
		SettingsManager.Save(); // Save changes
	}

	private void StrengthPageBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
	{
		CheckedBorder2 = StrengthPageBorder; // Set
		StrengthPageRadioBtn.IsChecked = true;
		RefreshBordersPage(); // Refresh

		Global.Settings.StartupPage = DefaultPage.Strength; // Update
		SettingsManager.Save(); // Save changes
	}

	private void HidePasswordInStrengthChk_Checked(object sender, RoutedEventArgs e)
	{
		Global.Settings.HidePasswordInStrengthPage = HidePasswordInStrengthChk.IsChecked; // Set
		SettingsManager.Save(); // Save changes
	}

	private void HidePasswordInHistoryChk_Checked(object sender, RoutedEventArgs e)
	{
		Global.Settings.AlwaysHidePasswordInHistory = HidePasswordInHistoryChk.IsChecked; // Set
		SettingsManager.Save(); // Save changes
	}

	private void ResetPwrConfigBtn_Click(object sender, RoutedEventArgs e)
	{
		if (MessageBox.Show(Properties.Resources.UnsetPwrConfigMsg, Properties.Resources.Passliss, MessageBoxButton.YesNo, MessageBoxImage.Information) == MessageBoxResult.Yes)
		{
			for (int i = 0; i < Global.PasswordConfigurations.Count; i++)
			{
				Global.PasswordConfigurations[i].IsDefault = false; // Reset to default
			}
			SettingsManager.Save(); // Save changes
		}
	}

	private void ResetSettingsLink_Click(object sender, RoutedEventArgs e)
	{
		if (MessageBox.Show(Properties.Resources.ResetSettingsConfirmMsg, Properties.Resources.Settings, MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
		{
			Global.Settings = new()
			{
				CheckUpdatesOnStart = false,
				IsDarkTheme = false,
				Language = "_default",
				NotifyUpdates = true,
				PasswordPreset = PasswordPresets.Simple,
				MinRandomLength = 10,
				MaxRandomLength = 30,
				UseRandomPasswordLengthOnStart = true,
				IsThemeSystem = true,
				StartupPage = DefaultPage.Generate,
				HidePasswordInStrengthPage = false,
				AlwaysHidePasswordInHistory = false,
				DisableHistory = false,
				IsFirstRun = false,
				DefaultEncryptionAlgorithm = EncryptionAlgorithm.AES,
				UseSimpleSpecialChars = false,
			}; // Create default settings

			SettingsManager.Save(); // Save the changes
			InitUI(); // Reload the page

			MessageBox.Show(Properties.Resources.SettingsReset, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
			Process.Start(Directory.GetCurrentDirectory() + @"\Passliss.exe");
			Environment.Exit(0); // Quit
		}
	}

	private void SeeLicensesBtn_Click(object sender, RoutedEventArgs e)
	{
		MessageBox.Show($"{Properties.Resources.Licenses}\n\n" +
			"Fluent System Icons - MIT License - © 2020 Microsoft Corporation\n" +
			"LeoCorpLibrary - MIT License - © 2020-2022 Léo Corporation\n" +
			"Passliss - MIT License - © 2021-2022 Léo Corporation", $"{Properties.Resources.Passliss} - {Properties.Resources.Licenses}", MessageBoxButton.OK, MessageBoxImage.Information);
	}

	private void EncryptionPageRadioBtn_Checked(object sender, RoutedEventArgs e)
	{
		CheckedBorder2 = EncryptionPageBorder; // Set
		EncryptionPageRadioBtn.IsChecked = true;
		RefreshBordersPage(); // Refresh

		Global.Settings.StartupPage = DefaultPage.Encryption; // Update
		SettingsManager.Save(); // Save changes
	}

	private void EncryptionPageBorder_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
	{
		CheckedBorder2 = EncryptionPageBorder; // Set
		EncryptionPageRadioBtn.IsChecked = true;
		RefreshBordersPage(); // Refresh

		Global.Settings.StartupPage = DefaultPage.Encryption; // Update
		SettingsManager.Save(); // Save changes
	}

	private void DisableHistoryChk_Checked(object sender, RoutedEventArgs e)
	{
		Global.Settings.DisableHistory = DisableHistoryChk.IsChecked; // Set

		SettingsManager.Save(); // Save changes
	}

	private void AlgorithmComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
	{
		Global.Settings.DefaultEncryptionAlgorithm = (EncryptionAlgorithm)AlgorithmComboBox.SelectedIndex;

		SettingsManager.Save(); // Save changes
	}

	private void ExportPwrConfig_Click(object sender, RoutedEventArgs e)
	{
		SaveFileDialog saveFileDialog = new()
		{
			FileName = $"{Properties.Resources.PasswordConfigurations}.xml",
			Title = Properties.Resources.Export,
			Filter = "XML Files|*.xml"
		}; // Create a SaveFileDialog

		if (saveFileDialog.ShowDialog() ?? true)
		{
			PasswordConfigurationManager.Export(Global.PasswordConfigurations, saveFileDialog.FileName); // Export
		}
	}

	private void ImportPwrConfig_Click(object sender, RoutedEventArgs e)
	{
		OpenFileDialog openFileDialog = new()
		{
			FileName = $"{Properties.Resources.PasswordConfigurations}.xml",
			Title = Properties.Resources.Import,
			Filter = "XML Files|*.xml"
		}; // Create a OpenFileDialog

		if (openFileDialog.ShowDialog() ?? true)
		{
			PasswordConfigurationManager.Import(openFileDialog.FileName); // Import
		}
	}

	private void UseSimplerCharsChk_Unchecked(object sender, RoutedEventArgs e)
	{
		Global.Settings.UseSimpleSpecialChars = UseSimplerCharsChk.IsChecked; // Set
		SettingsManager.Save(); // Save changes

		// Refresh special characters
		Global.SpecialCaracters = Global.Settings.UseSimpleSpecialChars.Value ? ";,:,!,/,*,$,%,),=,+,-,',(,_,<,>,?" : ";,:,!,/,§,ù,*,$,%,µ,£,),=,+,*,-,&,é,',(,-,è,_,ç,<,>,?,^,¨";
	}
}
