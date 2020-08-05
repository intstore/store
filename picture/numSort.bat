

rem 不连续
@echo off&setlocal enabledelayedexpansion
REM cd.>
for /d %%a  in (*.*) do (  rem 多个根目录

for /r /d %%a in (*.*) do (
pushd %%a
set n=10
for /f "delims=" %%B in ('dir /a-d /b /on^|findstr /i "jpg$ bmp$ png$"') do (
set /a n+=1
set m=!n:~1!
ren "%%B" "!m!%%~xB"
)
popd
)

)
goto eof