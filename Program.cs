using MVCDOMSetup.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MVCDOMSetup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddScoped<IViewRenderService, ViewRenderService>();
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }

    public class SystemTextJsonExceptionConverter : JsonConverter<Exception>
    {
        public override Exception Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public override void Write(Utf8JsonWriter writer, Exception value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();
            writer.WriteString(nameof(Exception.Message), value.Message);

#if DEBUG
            if (value.InnerException is not null)
            {
                writer.WriteStartObject(nameof(Exception.InnerException));
                Write(writer, value.InnerException, options);
                writer.WriteEndObject();
            }

            if (value.TargetSite is not null)
            {
                writer.WriteStartObject(nameof(Exception.TargetSite));
                writer.WriteString(nameof(Exception.TargetSite.Name), value.TargetSite?.Name);
                writer.WriteString(nameof(Exception.TargetSite.DeclaringType), value.TargetSite?.DeclaringType?.FullName);
                writer.WriteEndObject();
            }

            if (value.StackTrace is not null)
            {
                writer.WriteString(nameof(Exception.StackTrace), value.StackTrace);
            }
#endif

            writer.WriteString(nameof(Type), value.GetType().ToString());
            writer.WriteEndObject();
        }
    }
}
