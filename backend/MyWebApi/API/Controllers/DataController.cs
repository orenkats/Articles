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
    }
}
