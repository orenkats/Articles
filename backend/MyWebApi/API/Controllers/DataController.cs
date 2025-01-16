using Microsoft.AspNetCore.Mvc;
using MyWebApi.Application.Interfaces;

namespace MyWebApi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly IFileReaderService _fileReaderService;

        public DataController(IFileReaderService fileReaderService)
        {
            _fileReaderService = fileReaderService;
        }

        [HttpGet("articles")]
        public IActionResult GetArticles()
        {
            try
            {
                var articles = _fileReaderService.ReadArticles("json.txt");
                return Ok(articles);
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("articles/{id}")]
        public IActionResult GetArticleById(int id)
        {
            try
            {
                var articles = _fileReaderService.ReadArticles("json.txt");
                var article = articles.FirstOrDefault(a => a.Id == id);
                
                if (article == null)
                {
                    return NotFound(new { message = $"Article with ID {id} not found" });
                }

                return Ok(article);
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("tags")]
        public IActionResult GetTags()
        {
            try
            {
                var tags = _fileReaderService.ReadTags("jsontags.txt");
                return Ok(tags);
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpGet("articles/by-tag/{tagId}")]
        public IActionResult GetArticlesByTag(int tagId)
        {
            try
            {
                var articles = _fileReaderService.ReadArticles("json.txt");
                var filteredArticles = articles
                    .Where(a => a.Tags.Any(tag => tag.TagId == tagId))
                    .ToList();

                if (!filteredArticles.Any())
                {
                    return NotFound(new { message = $"No articles found with tag ID {tagId}" });
                }

                return Ok(filteredArticles);
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
