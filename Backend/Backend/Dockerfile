FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY Backend/Backend/Backend.csproj Backend/Backend/
RUN dotnet restore Backend/Backend/Backend.csproj

COPY . .
WORKDIR /app/Backend/Backend
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "Backend.dll"]
