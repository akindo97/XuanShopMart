cmake_minimum_required(VERSION 3.13)

# Define the library exposed by the app.
project(appmodules)

# Align every shared library we link to the 16 KB page size requirement so
# the binary is ready for devices shipping a larger memory page.
if(ANDROID)
  add_link_options(-Wl,-z,max-page-size=16384)
endif()

# Pull in the default React Native CMake configuration for the app.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)
