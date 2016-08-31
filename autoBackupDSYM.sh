#!/bin/sh

echo "starting dsym archiving"  
  
  
if [ "$BUILD_STYLE" == "Debug" ]; then  
echo "Skipping debug"  
echo "exit 0;"  
fi  
  
  
if [ "$EFFECTIVE_PLATFORM_NAME" == "-iphonesimulator" ]; then  
echo "Skipping simulator build"  
echo "exit 0;"  
fi  
  
  
echo "TARGET_BUILD_DIR:${TARGET_BUILD_DIR}"  
echo "DERIVED_FILE_DIR:${DERIVED_FILE_DIR}"  
  
  
echo "ARCHIVE_DSYMS_PATH:${ARCHIVE_DSYMS_PATH}"  
echo "ARCHIVE_PRODUCTS_PATH:"$ARCHIVE_PRODUCTS_PATH  
echo "ARCHIVE_PATH:${ARCHIVE_PATH}"  
  
  
echo "SRC_PATH=${ARCHIVE_DSYMS_PATH}/${DWARF_DSYM_FILE_NAME}"  
  
  
SRC_PATH=${TARGET_BUILD_DIR}/${DWARF_DSYM_FILE_NAME}  
RELATIVE_DEST_PATH=dSYM/${EXECUTABLE_NAME}.$(date +%Y%m%d%H%M%S).app.dSYM  
DEST_PATH=${PROJECT_DIR}/${RELATIVE_DEST_PATH}  
echo "moving ${SRC_PATH} to ${DEST_PATH}"  
  
  
mkdir -p "${DEST_PATH}"  
  
  
cp -r "${SRC_PATH}" "${DEST_PATH}"  
  
  
if [ -f ".git/config" ]; then  
git add "${RELATIVE_DEST_PATH}"  
git commit -m "Added dSYM file for ${BUILD_STYLE} build" "${RELATIVE_DEST_PATH}"  
fi