FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["RouteTracker.Api.csproj", "./"]
RUN dotnet restore "./RouteTracker.Api.csproj"

COPY . .
RUN dotnet publish "./RouteTracker.Api.csproj" \
    --configuration Release \
    --output /app/publish \
    --no-restore \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
ENV ConnectionStrings__RouteTracker="Data Source=/data/RouteTracker.db"

RUN mkdir -p /data && chown "$APP_UID:$APP_UID" /data
USER $APP_UID

EXPOSE 8080
ENTRYPOINT ["dotnet", "RouteTracker.Api.dll"]
