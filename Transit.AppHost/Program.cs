var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Transit_Server>("transit-server");

builder.Build().Run();
