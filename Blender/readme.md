Pack the content of the folder into a ZIP file and import it into Blender via Edit &gt; Preferences &gt; Add-ons &gt; Install.
You may get an error message that a package is missing.
We recommend installing gRPC via https://github.com/luigipacheco/blenderpipinstaller - similar to before, go to Blender Preferences &gt; Add-ons &gt; Install and select the downloaded ZIP file.
Now open a Text edit window and open the sidebar. Select the "Pip Installer" tab. Install the following packages: "grpcio" and "protobuf". Especially protobuf may take a while to install.
Then restart Blender and enable the PRC Add-on again.
It should now be visible in the sidebar.