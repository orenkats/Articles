namespace MyWebApi.Domain.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public string ImageCredit { get; set; }
        public string Date { get; set; }
        public List<Tag> Tags { get; set; }
        public string Body { get; set; }
    }


}
