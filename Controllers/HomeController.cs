using Microsoft.AspNetCore.Mvc;

namespace PublishingStarter.Controllers;

public class HomeController : Controller
{
    [HttpGet("/")]
    [HttpGet("/home/index")]
    public IActionResult Index() => View("~/Views/Front/Home/Index.cshtml");

    [HttpGet("/brand/index")]
    public IActionResult Brand() => View("~/Views/Front/Brand/Index.cshtml");

    [HttpGet("/qualification/index")]
    public IActionResult Qualification() => View("~/Views/Front/Qualification/Index.cshtml");

    [HttpGet("/education/index")]
    public IActionResult Education() => View("~/Views/Front/Education/Index.cshtml");

    [HttpGet("/partner/index")]
    public IActionResult Partner() => View("~/Views/Front/Partner/Index.cshtml");

    [HttpGet("/product/index")]
    public IActionResult Healthcare() => View("~/Views/Front/Product/Index.cshtml");

    [HttpGet("/product/detail")]
    public IActionResult Product() => View("~/Views/Front/Product/Detail.cshtml");

    [HttpGet("/news/notices")]
    public IActionResult Notices() => View("~/Views/Front/News/Notices.cshtml");

    [HttpGet("/news/insights")]
    public IActionResult Insights() => View("~/Views/Front/News/Insights.cshtml");

    [HttpGet("/news/insightdetail")]
    public IActionResult InsightDetail() => View("~/Views/Front/News/InsightDetail.cshtml");

    [HttpGet("/news/noticedetail")]
    public IActionResult NoticeDetail() => View("~/Views/Front/News/NoticeDetail.cshtml");

    [HttpGet("/inquiry")]
    public IActionResult Contact() => View("~/Views/Front/Inquiry/Index.cshtml");

    [HttpGet("/policy/privacy")]
    public IActionResult Privacy() => View("~/Views/Front/Policy/Privacy.cshtml");

    [HttpGet("/policy/terms")]
    public IActionResult Terms() => View("~/Views/Front/Policy/Terms.cshtml");
}

