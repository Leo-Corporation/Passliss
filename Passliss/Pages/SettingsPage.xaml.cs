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
using Passliss.Classes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Passliss.Pages
{
	/// <summary>
	/// Logique d'interaction pour SettingsPage.xaml
	/// </summary>
	public partial class SettingsPage : Page
	{
		bool isAvailable;
		System.Windows.Forms.NotifyIcon notifyIcon = new System.Windows.Forms.NotifyIcon();
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

		private async void InitUI()
		{
			// Load RadioButtons
			DarkRadioBtn.IsChecked = Global.Settings.IsDarkTheme; // Change IsChecked property
			LightRadioBtn.IsChecked = !Global.Settings.IsDarkTheme; // Change IsChecked property

			// Load checkboxes
			CheckUpdatesOnStartChk.IsChecked = Global.Settings.CheckUpdatesOnStart.HasValue ? Global.Settings.CheckUpdatesOnStart.Value : true; // Set
			NotifyUpdatesChk.IsChecked = Global.Settings.NotifyUpdates.HasValue ? Global.Settings.NotifyUpdates.Value : true; // Set


			// Load LangComboBox
			LangComboBox.Items.Add(Properties.Resources.Default); // Add "default"

			for (int i = 0; i < Global.LanguageList.Count; i++)
			{
				LangComboBox.Items.Add(Global.LanguageList[i]);
			}

			LangComboBox.SelectedIndex = (Global.Settings.Language == "_default") ? 0 : Global.LanguageCodeList.IndexOf(Global.Settings.Language) + 1;

			// Load PresetComboBox
			PresetComboBox.Items.Add(Properties.Resources.Simple); // Add item
			PresetComboBox.Items.Add(Properties.Resources.Complex); // Add item

			PresetComboBox.SelectedIndex = Global.Settings.PasswordPreset.HasValue ? Global.Settings.PasswordPreset switch
			{
				PasswordPresets.Simple => 0,
				PasswordPresets.Complex => 1,
				_ => 0
			} : 0;

			// Apply buttons
			LangApplyBtn.Visibility = Visibility.Hidden; // Hide
			ThemeApplyBtn.Visibility = Visibility.Hidden; // Hide
			PresetApplyBtn.Visibility = Visibility.Hidden; // Hide

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
			}
		}

		private void ThemeApplyBtn_Click(object sender, RoutedEventArgs e)
		{
			Global.Settings.IsDarkTheme = DarkRadioBtn.IsChecked.Value; // Set the settings
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
		private void DisplayRestartMessage()
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

		private void TextBlock_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
		{
			MessageBox.Show($"{Properties.Resources.Licenses}\n\n" +
				"Fluent System Icons - MIT License - © 2020 Microsoft Corporation\n" +
				"LeoCorpLibrary - MIT License - © 2020-2021 Léo Corporation\n" +
				"Passliss - MIT License - © 2021 Léo Corporation", $"{Properties.Resources.Passliss} - {Properties.Resources.Licenses}", MessageBoxButton.OK, MessageBoxImage.Information);
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

		private void ResetSettingsLink_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
		{
			if (MessageBox.Show(Properties.Resources.ResetSettingsConfirmMsg, Properties.Resources.Settings, MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
			{
				Global.Settings = new()
				{
					CheckUpdatesOnStart = true,
					IsDarkTheme = false,
					Language = "_default",
					NotifyUpdates = true,
					PasswordPreset = PasswordPresets.Simple
				}; // Create default settings

				SettingsManager.Save(); // Save the changes
				InitUI(); // Reload the page

				MessageBox.Show(Properties.Resources.SettingsReset, Properties.Resources.Passliss, MessageBoxButton.OK, MessageBoxImage.Information);
				Process.Start(Directory.GetCurrentDirectory() + @"\Passliss.exe");
				Environment.Exit(0); // Quit
			}
		}

		private void PresetComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
		{
			PresetApplyBtn.Visibility = Visibility.Visible; // Show
		}

		private void PresetApplyBtn_Click(object sender, RoutedEventArgs e)
		{
			Global.Settings.PasswordPreset = PresetComboBox.SelectedIndex switch
			{
				0 => PasswordPresets.Simple,
				1 => PasswordPresets.Complex,
				_ => PasswordPresets.Simple
			}; // Set
			SettingsManager.Save(); // Save the changes
			PresetApplyBtn.Visibility = Visibility.Hidden; // Hide
		}
	}
}
