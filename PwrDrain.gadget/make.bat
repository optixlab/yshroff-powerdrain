@echo off
REM Seeing as Visual Studio's CAB project type appears to be essentially
REM useless for creating Sidebar Gadgets (for example, I didn't find a way
REM to include directories), here's a very scientific solution: copy the
REM files and cab them up manually...
REM
REM We're using a whitelist to decide what gets deployed.

makecab /f PwrDrain.ddf
signtool sign /v /f PwrDrain.pfx /t "http://timestamp.verisign.com/scripts/timstamp.dll" /d "PwrDrain Windows Sidebar gadget" /u "http://code.google.com/p/pwrdrain-gadget" PwrDrain.gadget
