@echo off
echo Testing Load Balancer...
echo Results will be saved to ..\lb-test-results\results.txt

REM Create directory if it doesn't exist
if not exist "..\lb-test-results" mkdir "..\lb-test-results"

REM Clear previous results
echo Load Balancer Test Results > ..\lb-test-results\results.txt
echo ========================== >> ..\lb-test-results\results.txt
echo. >> ..\lb-test-results\results.txt

REM Make 10 requests to test load balancing
for /l %%i in (1, 1, 10) do (
    echo Request %%i:
    echo Request %%i: >> ..\lb-test-results\results.txt
    curl -s http://localhost:8000/api/product-service/lb-test >> ..\lb-test-results\results.txt
    echo. >> ..\lb-test-results\results.txt
    echo. >> ..\lb-test-results\results.txt
    timeout /t 1 > nul
)

echo Testing complete. Results saved to ..\lb-test-results\results.txt
echo.
echo Opening results file...
start notepad ..\lb-test-results\results.txt