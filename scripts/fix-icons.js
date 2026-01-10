#!/usr/bin/env node
/**
 * 批量修复已转录的图标组件
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/icon/components');

/**
 * 修复单个图标文件
 */
function fixIconFile(filename) {
  const filePath = path.join(COMPONENTS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // 检查是否需要修复
  if (!content.includes('class="svg"')) {
    return false; // 已经是正确的格式
  }

  // 修复：将 class="svg" 改为 class={classes.svg}
  content = content.replace(/class="svg"/g, 'class={classes.svg}');

  // 确保有 svg: ({ classes }) 参数
  if (!content.includes('svg: ({ classes })')) {
    content = content.replace(
      /svg: \(\) => \(/,
      'svg: ({ classes }) => ('
    );
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

/**
 * 主函数
 */
function main() {
  console.log('🔧 修复图标组件...\n');

  const files = fs.readdirSync(COMPONENTS_DIR)
    .filter(f => f.endsWith('.tsx') && f !== 'DismissFilled.tsx');

  let fixed = 0;
  let skipped = 0;

  files.forEach(file => {
    if (fixIconFile(file)) {
      console.log(`✓  修复: ${file}`);
      fixed++;
    } else {
      skipped++;
    }
  });

  console.log(`\n✅ 完成!`);
  console.log(`   修复: ${fixed}`);
  console.log(`   跳过: ${skipped}\n`);
}

main();
