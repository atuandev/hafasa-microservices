@echo off
REM This script starts multiple instances of a service on different ports
REM Usage: run-service-instances.bat <service-name> <base-port> <number-of-instances>

set SERVICE_NAME=%1
set BASE_PORT=%2
set INSTANCES=%3

if "%SERVICE_NAME%"=="" goto usage
if "%BASE_PORT%"=="" goto usage
if "%INSTANCES%"=="" goto usage

echo Starting %INSTANCES% instances of %SERVICE_NAME%...

set /a i=0
:loop
if %i% equ %INSTANCES% goto end

set /a PORT=BASE_PORT+i
echo Starting %SERVICE_NAME% instance on port %PORT%
start cmd /c "cd ..\%SERVICE_NAME% && mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=%PORT% --eureka.instance.instance-id=%SERVICE_NAME%:%PORT%"

set /a i+=1
goto loop

:usage
echo Usage: run-service-instances.bat ^<service-name^> ^<base-port^> ^<number-of-instances^>
goto :eof

:end
echo All instances started successfully!