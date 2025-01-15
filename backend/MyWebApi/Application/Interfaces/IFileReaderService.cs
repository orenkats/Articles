using System.Collections.Generic;
using MyWebApi.Domain.Models;

namespace MyWebApi.Application.Interfaces
{
    public interface IFileReaderService
    {
        IEnumerable<Article> ReadArticles(string filePath);
        IEnumerable<Tag> ReadTags(string filePath);
    }
}
