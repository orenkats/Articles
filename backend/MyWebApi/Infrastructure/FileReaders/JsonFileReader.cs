using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using MyWebApi.Application.Interfaces;
using MyWebApi.Domain.Models;

namespace MyWebApi.Infrastructure.FileReaders
{
    public class JsonFileReader : IFileReaderService
    {
        private readonly string _basePath;

        public JsonFileReader()
        {
            // Explicitly set the base path to the folder you provided
            _basePath = @"C:\Users\User\Desktop\Maariv\backend\MyWebApi\DataFiles";
        }

        public IEnumerable<Article> ReadArticles(string filePath)
        {
            try
            {
                var fullPath = Path.Combine(_basePath, filePath);
                if (!File.Exists(fullPath))
                    throw new FileNotFoundException($"File not found: {fullPath}");

                var json = File.ReadAllText(fullPath);

                return JsonSerializer.Deserialize<IEnumerable<Article>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true // Allow case-insensitive mapping
                }) ?? new List<Article>();
            }
            catch (JsonException ex)
            {
                throw new InvalidDataException($"Error deserializing file: {filePath}", ex);
            }
        }

        public IEnumerable<Tag> ReadTags(string filePath)
        {
            try
            {
                var fullPath = Path.Combine(_basePath, filePath);
                if (!File.Exists(fullPath))
                    throw new FileNotFoundException($"File not found: {fullPath}");

                var json = File.ReadAllText(fullPath);

                return JsonSerializer.Deserialize<IEnumerable<Tag>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true // Allow case-insensitive mapping
                }) ?? new List<Tag>();
            }
            catch (JsonException ex)
            {
                throw new InvalidDataException($"Error deserializing file: {filePath}", ex);
            }
        }
    }
}
