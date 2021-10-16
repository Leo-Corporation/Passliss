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

namespace Passliss.Classes
{
	public class PasswordConfiguration
	{
		/// <summary>
		/// <see cref="true"/> to use upper cases.
		/// </summary>
		public bool UseUpperCase { get; set; }

		/// <summary>
		/// <see cref="true"/> to use lower cases.
		/// </summary>
		public bool UseLowerCase { get; set; }

		/// <summary>
		/// <see cref="true"/> to use numbers.
		/// </summary>
		public bool UseNumbers { get; set; }

		/// <summary>
		/// <see cref="true"/> to use special caracters.
		/// </summary>
		public bool UseSpecialCaracters { get; set; }

		/// <summary>
		/// The length of the password.
		/// </summary>
		public string Length { get; set; }

		/// <summary>
		/// The name of the <see cref="PasswordConfiguration"/>.
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// True if the password configuration is set by default
		/// </summary>
		public bool? IsDefault { get; set; }
	}
}
