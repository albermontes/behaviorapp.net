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
        public static string Join(this IEnumerable<string> col, string joinChar)
        {
            if (col.Count() == 0)
                return "";
            if (col.Count() == 1)
                return col.ElementAt(0);
            var result = col.ElementAt(0);
            for (int i = 1; i < col.Count(); i++)
                result += joinChar + col.ElementAt(i);
            return result;
        }
        public static string Format(this ICollection<string> col, bool allTextStartWithCapital = false)
        {
            var list = col.ToList();

            var formattedString = "";
            if (list.Count == 0)
                return formattedString;
            if (list.Count == 1)
                return list[0];

            for (int i = 0; i < list.Count - 1; i++)
            {
                formattedString += allTextStartWithCapital
                    ? list[i].AddStartCapitalLetter() + ", "
                    : list[i].RemoveStartCapitalLetter() + ", ";
            }
            formattedString = formattedString.Substring(0, formattedString.Length - 2);
            formattedString += $" and {list[list.Count - 1].RemoveStartCapitalLetter()}";

            return formattedString;
        }
        public static string Format(this ICollection<Pair> list, 
            string markClass = null, 
            string startText = "", 
            string endText = "", 
            bool startWithCapital = true,
            bool allTextStartWithCapital = false)
        {
            var text = list.Select(x => x.label).ToList().Format(allTextStartWithCapital);
            text = startWithCapital
                    ? text.AddStartCapitalLetter()
                    : text.RemoveStartCapitalLetter();

            return (list.Any()
                        ? (markClass != null ? $"<mark class=\"{markClass}\">" : "") +
                            $"{startText}{text}{endText}" +
                           (markClass != null ? "</mark>" : "")
                        : "");
        }
        public static string Format(this ICollection<MyBehavior> list,
           string markClass = null,
           string startText = "",
           string endText = "",
           bool startWithCapital = true,
           bool allTextStartWithCapital = false)
        {
            var text = list.Select(x => $"{x.label}").ToList().Format(allTextStartWithCapital);
            text = startWithCapital
                    ? text.AddStartCapitalLetter()
                    : text.RemoveStartCapitalLetter();

            var details = list.Select(x => 
                    x.selectedItems != null 
                        ? x.selectedItems.Format(markClass, "", "", true, false) 
                        : "");

            var detailsString = details.All(x=>x == "" || x == null) 
                    ? "" 
                    : details.Where(x=>x != "" && x != null).Select(x=>x).Join(". ");

            var descriptionsDetails = list.All(x => x.description == "" || x.description == null)
                    ? "" 
                    : list.Where(x =>x.description != "" && x.description != null).Select(x => x.description.AddStartCapitalLetter()).Join(". ");

            return (list.Any()
                        ? (markClass != null ? $"<mark class=\"{markClass}\">" : "") +
                            $"{startText}{(text != "" ? $"{text}. " : "")}{endText}" +
                            $"{(detailsString != "" ? $"{detailsString}. " : "")}" +
                            $"{(descriptionsDetails != "" ? $"{descriptionsDetails}. " : "")}" +
                           (markClass != null ? "</mark>" : "")
                        : "");
        }
        public static string RemoveDuplicateSpacesAndDots(this string text)
        {
            var result = "";
            if (text.Length == 0)
                return result;
            result += text[0];
            var pos = 0;
            for (int i = 1; i < text.Length; i++)
            {
                // remove duplicates
                if (text[i] == result[pos] &&
                        (text[i] == ' ' ||
                        text[i] == '.'))
                    continue;
                // do not add spaces before dots
                if (result[pos] == ' ' &&
                        text[i] == '.')
                {
                    result = result.Remove(pos, 1);
                    pos--;
                }
                // add space after dot
                if (result[pos] == '.' &&
                    text[i] != ' ')
                {
                    result += ' ';
                    pos++;
                }
                // add the char
                result += text[i];
                pos++;
            }
            return result.Trim();
        }
    }
}