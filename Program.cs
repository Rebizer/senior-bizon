using Microsoft.AspNetCore.DataProtection;

// 화면 미리보기를 위한 최소 Razor MVC 호스트. 서버 기능은 포함하지 않는다.
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDataProtection().UseEphemeralDataProtectionProvider();
}
var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.MapControllers();

var previousPaths = new Dictionary<string, string>
{
    ["/brand"] = "/brand/index",
    ["/qualification"] = "/qualification/index",
    ["/education"] = "/education/index",
    ["/partner"] = "/partner/index",
    ["/healthcare"] = "/product/index",
    ["/product"] = "/product/detail",
    ["/notices"] = "/news/notices",
    ["/notice"] = "/news/noticedetail",
    ["/insights"] = "/news/insights",
    ["/insight"] = "/news/insightdetail",
    ["/contact"] = "/inquiry",
    ["/inquiry/index"] = "/inquiry"
};

foreach (var (previousPath, currentPath) in previousPaths)
{
    app.MapGet(previousPath, (HttpRequest request) => Results.LocalRedirect(currentPath + request.QueryString));
}

app.Run();

