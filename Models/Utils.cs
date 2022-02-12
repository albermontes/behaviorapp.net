using System;
using System.Collections.Generic;
using System.Linq;

namespace behavior_app.Models
{
    public static class Utils
    {
        public static string RemoveStartCapitalLetter(this string text){
            return text != null 
                    && text.Length > 1 
                    && text.Substring(1,1) != text.Substring(1, 1).ToUpper()
                ? text.Substring(0,1).ToLower() + text.Substring(1)
                : text;
        }
        public static string AddStartCapitalLetter(this string text){
            return text != null && text.Length > 0 
                ? text.Substring(0,1).ToUpper() + text.Substring(1)
                : text;
        }
        public static bool StartsWithVocal(this string text){
            return text != null && (text.ToLower().StartsWith('a') ||
                text.ToLower().StartsWith('e') ||
                text.ToLower().StartsWith('i') ||
                text.ToLower().StartsWith('o') ||
                text.ToLower().StartsWith('u'));
        }
        public static string Format(this List<string> list)
        {
            var formattedString = "";
            if (list.Count == 0)
                return formattedString;
            if (list.Count == 1)
                return list[0];

            for (int i = 0; i < list.Count - 1; i++)
            {
                formattedString += list[i].RemoveStartCapitalLetter() + ", ";
            }
            formattedString = formattedString.Substring(0, formattedString.Length - 2);
            formattedString += $" and {list[list.Count - 1].RemoveStartCapitalLetter()}";

            return formattedString;
        }
        public static string Format(this List<Pair> list, string markClass = null, string startText = "", string endText = "", bool startWithCapital = true)
        {
            var text = list.Select(x => x.label).ToList().Format();
            text = startWithCapital
                    ? text.AddStartCapitalLetter()
                    : text.RemoveStartCapitalLetter();

            return (list.Any()
                        ? (markClass != null ? $"<mark class=\"{markClass}\">" : "") +
                            $"{startText}{text}{endText}" +
                           (markClass != null ? "</mark>" : "")
                        : "");
        }
    }
}