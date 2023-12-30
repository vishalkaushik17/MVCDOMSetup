using Microsoft.AspNetCore.Mvc;
using MVCDOMSetup.Models;

namespace MVCDOMSetup.Controllers
{
    [Produces("application/json")]
    public class HomeController : Controller
    {
        private readonly IViewRenderService _viewRenderService;
        private readonly Response _response;
        public HomeController(IViewRenderService viewRenderService)
        {
            _viewRenderService = viewRenderService;
            _response = new Response();
        }

        public ActionResult Index(string test)
        {

            return View(test);
        }
        [Route("Home")]
        public async Task<Response> Home()
        {

            try
            {
                ViewData["Message"] = "Your application description page.";
                var viewModel = new InviteViewModel
                {
                    UserId = "cdb86aea-e3d6-4fdd-9b7f-55e12b710f78",
                    UserName = "Hasan",
                    ReferralCode = "55e12b710f78",
                    Credits = 10
                };
                _response.HtmlResponse = await _viewRenderService.RenderToStringAsync("Home/Index", viewModel);
                if (string.IsNullOrWhiteSpace(_response.HtmlResponse))
                {
                    _response.Status = false;
                    _response.ShowMessage = true;
                    _response.Message = "View not available!!!";
                }
            }
            catch (Exception ex)
            {
                _response.ShowMessage = true;
                _response.HtmlResponse = "";
                _response.Status = false;
                _response.Message = ex.Message;


            }
            return await Task.Run(() => _response);
        }
        public async Task<Response> Privacy()
        {

            try
            {
                ViewData["Message"] = "Your application description page.";
                var viewModel = new InviteViewModel
                {
                    UserId = "cdb86aea-e3d6-4fdd-9b7f-55e12b710f78",
                    UserName = "Hasan",
                    ReferralCode = "55e12b710f78",
                    Credits = 10
                };
                _response.HtmlResponse = await _viewRenderService.RenderToStringAsync("Home/Privacy", viewModel);
                if (string.IsNullOrWhiteSpace(_response.HtmlResponse))
                {
                    _response.Status = false;
                    _response.ShowMessage = true;
                    _response.Message = "View not available!!!";
                }
            }
            catch (Exception ex)
            {
                _response.ShowMessage = true;
                _response.HtmlResponse = "";
                _response.Status = false;
                _response.Message = ex.Message;


            }
            return await Task.Run(() => _response);
        }
        public async Task<Response> About()
        {

            try
            {
                ViewBag.Message = "Your application description page.";
                _response.HtmlResponse = await _viewRenderService.RenderToStringAsync("Home/About", null);
                if (string.IsNullOrWhiteSpace(_response.HtmlResponse))
                {
                    _response.Status = false;
                    _response.ShowMessage = true;
                    _response.Message = "View not available!!!";
                }
            }
            catch (Exception ex)
            {
                _response.ShowMessage = true;
                _response.HtmlResponse = "";
                _response.Status = false;
                _response.Message = ex.Message;


            }
            return await Task.Run(() => _response);
        }



        public async Task<Response> Contact()
        {
            try
            {
                ViewBag.Message = "Your contact page.";
                _response.HtmlResponse = await _viewRenderService.RenderToStringAsync("Home/Contact", null);
                if (string.IsNullOrWhiteSpace(_response.HtmlResponse))
                {
                    _response.Status = false;
                    _response.ShowMessage = true;
                    _response.Message = "View not available!!!";
                }
            }
            catch (Exception ex)
            {
                _response.ShowMessage = true;
                _response.HtmlResponse = "";
                _response.Status = false;
                _response.Message = ex.Message;

            }
            return await Task.Run(() => _response);

        }


        public async Task<IActionResult> Test()
        {
            var EmpData = new Employee();
            EmpData.Id = 1;
            EmpData.Name = "Vishal Kaushik";


            var result = await _viewRenderService.RenderToStringAsync("Home/Test", null);
            return Content(result);

        }

    }
    public class InviteViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ReferralCode { get; set; }
        public int Credits { get; set; }
    }
    public class Response
    {
        public string HtmlResponse { get; set; }
        public bool Status { get; set; } = true;
        public string Message { get; set; }
        public bool ShowMessage { get; set; }
    }
}
