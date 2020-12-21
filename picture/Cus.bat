 @echo off&setlocal enabledelayedexpansion
 cd.>list.txt
 set h=0
 set "folder=.\"
 (for /r "%folder%\" %%a in (.) do (
   set /a n=0
   set s=%%a&set s=!s:~,-1!
	   if !h! gtr 0 (
	   for %%b in ("!s!\*") do set /a n+=1,m+=1
	   if !n! lss 1 (echo,%%~na ) else echo,  【 %%~na 】 ^= !n!张图片  
   )
   set /a h+=1
 )
 echo,文件总数 !m!)>>list.txt

start list.txt
goto eof
 
 