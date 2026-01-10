#!/usr/bin/env node
/**
 * 批量转录 React 图标到 Vue 图标
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../react-components/react-icons-mdl2/src/components');
const DEST_DIR = path.join(__dirname, '../src/icon/components');

// 要转录的图标列表（约100个常用图标）
const ICONS_TO_MIGRATE = [
  // 基础操作
  'AddIcon', 'DeleteIcon', 'EditIcon', 'SaveIcon', 'CancelIcon', 'AcceptIcon',
  'CheckMarkIcon', 'CopyIcon', 'PasteIcon', 'CutIcon', 'RedoIcon', 'UndoIcon',
  'ClearIcon', 'CloseIcon', 'DismissIcon', 'FilterIcon', 'SortIcon',

  // 搜索和缩放
  'SearchIcon', 'ZoomInIcon', 'ZoomOutIcon', 'FullScreenIcon', 'ZoomToFitIcon',

  // 文件操作
  'PrintIcon', 'DownloadIcon', 'UploadIcon', 'ShareIcon', 'LinkIcon', 'UnlinkIcon', 'RefreshIcon',

  // 导航箭头
  'ArrowUpIcon', 'ArrowDownIcon', 'ArrowLeftIcon', 'ArrowRightIcon',
  'ChevronUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon',
  'ChevronUpSmallIcon', 'ChevronDownSmallIcon', 'ChevronLeftSmallIcon', 'ChevronRightSmallIcon',
  'ChevronUpMedIcon', 'ChevronDownMedIcon', 'ChevronLeftMedIcon', 'ChevronRightMedIcon',
  'BackIcon', 'ForwardIcon', 'UpIcon', 'DownIcon',

  // 展开/折叠
  'ExpandIcon', 'CollapseIcon',

  // 状态图标
  'ErrorIcon', 'WarningIcon', 'InfoIcon', 'SuccessIcon', 'BlockedIcon',
  'CirclePauseIcon', 'CircleStopIcon', 'StatusCircleFullIcon', 'StatusTriangleIcon',
  'UnknownIcon', 'ErrorBadgeIcon', 'CompletedIcon',

  // 文件和文件夹
  'FolderIcon', 'FolderOpenIcon', 'FileCSSIcon', 'FileHTMLIcon', 'FileJSIcon',
  'FileCodeIcon', 'FileSymlinkIcon', 'ImageIcon', 'VideoIcon', 'AudioIcon',
  'AttachmentIcon', 'PageIcon', 'DocumentIcon',

  // 编辑格式
  'BoldIcon', 'ItalicIcon', 'UnderlineIcon', 'StrikethroughIcon',
  'FontSizeIcon', 'FontColorIcon', 'FontDecreaseIcon', 'FontIncreaseIcon',
  'AlignLeftIcon', 'AlignCenterIcon', 'AlignRightIcon', 'AlignJustifyIcon',
  'BulletListIcon', 'NumberListIcon', 'IndentIcon', 'OutdentIcon', 'LineSpacingIcon',

  // 媒体播放
  'PlayIcon', 'PauseIcon', 'StopIcon', 'NextIcon', 'PreviousIcon',
  'FastForwardIcon', 'RewindIcon', 'MuteIcon', 'UnmuteIcon', 'VolumeIcon',

  // 用户和账户
  'ContactIcon', 'GroupIcon', 'PeopleIcon', 'PartyLeaderIcon', 'PermissionsIcon',
  'ShieldIcon', 'LockIcon', 'UnlockIcon', 'ProtectedDocumentIcon', 'SecurityIcon',

  // 其他常用
  'SettingsIcon', 'GearIcon', 'ViewIcon', 'HideIcon', 'EyeIcon',
  'HeartIcon', 'StarIcon', 'FlagIcon', 'PinIcon', 'TagIcon',
  'MailIcon', 'CalendarIcon', 'ClockIcon', 'TimerIcon', 'AlarmClockIcon',
  'LocationIcon', 'MapIcon', 'HomeIcon', 'FavoritedIcon', 'FavoriteIcon',
];

/**
 * 转换 React 图标代码到 Vue 图标代码
 */
function convertReactToVue(reactCode, iconName) {
  let vueCode = reactCode
    // 移除 React 导入
    .replace(/import \* as React from ['"]react['"];\n/, '')
    // 修改 createSvgIcon 导入路径
    .replace(/import createSvgIcon from ['"]\.\.\/utils\/createSvgIcon['"];/,
      "import createSvgIcon from \"../utils/createSvgIcon\";")
    // 移除 aria-hidden 属性
    .replace(/\s*aria-hidden=["']true["']\s*/g, ' ')
    // 移除 focusable 属性
    .replace(/\s*focusable=["']false["']\s*/g, ' ')
    // 将 className={classes.svg} 改为 class={classes.svg}
    .replace(/className={classes\.svg}/g, 'class={classes.svg}')
    // 清理多余的空格
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><');

  return vueCode;
}

/**
 * 转录单个图标
 */
function migrateIcon(iconName) {
  const sourceFile = path.join(SOURCE_DIR, `${iconName}.tsx`);
  const destFile = path.join(DEST_DIR, `${iconName}.tsx`);

  // 检查源文件是否存在
  if (!fs.existsSync(sourceFile)) {
    console.log(`⚠️  Source file not found: ${iconName}`);
    return false;
  }

  // 检查目标文件是否已存在
  if (fs.existsSync(destFile)) {
    console.log(`⊘  Already exists: ${iconName}`);
    return false;
  }

  // 读取源文件
  const reactCode = fs.readFileSync(sourceFile, 'utf-8');

  // 转换代码
  const vueCode = convertReactToVue(reactCode, iconName);

  // 写入目标文件
  fs.writeFileSync(destFile, vueCode, 'utf-8');
  console.log(`✓  Migrated: ${iconName}`);
  return true;
}

/**
 * 主函数
 */
function main() {
  console.log(`\n🚀 Starting icon migration...\n`);
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}\n`);

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  ICONS_TO_MIGRATE.forEach(iconName => {
    try {
      const result = migrateIcon(iconName);
      if (result) {
        migrated++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`✗  Error migrating ${iconName}:`, error.message);
      errors++;
    }
  });

  console.log(`\n✅ Migration complete!`);
  console.log(`   Migrated: ${migrated}`);
  console.log(`   Skipped:  ${skipped}`);
  console.log(`   Errors:   ${errors}\n`);
}

// 运行主函数
main();
