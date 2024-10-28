const fs = require('fs');
const path = require('path');

const docsPath = path.resolve(__dirname, './docs'); // 确保路径正确

function generateSidebarConfig(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const sidebar = {};

    entries.forEach(entry => {
        // 只处理目录，排除以 .assets 结尾的目录
        if (entry.isDirectory() && !entry.name.endsWith('.assets')) {
            const basePath = `/docs/${entry.name}/`;
            sidebar[basePath] = [{
                text: entry.name,
                items: []
            }];

            const subEntries = fs.readdirSync(path.join(dirPath, entry.name), { withFileTypes: true });
            subEntries.forEach(subEntry => {
                const subEntryPath = path.join(dirPath, entry.name, subEntry.name);

                // 处理子目录
                if (subEntry.isDirectory()) {
                    const nestedItems = [];
                    const nestedEntries = fs.readdirSync(subEntryPath, { withFileTypes: true });
                    nestedEntries.forEach(nestedEntry => {
                        if (nestedEntry.isFile() && nestedEntry.name.endsWith('.md') && nestedEntry.name !== 'index.md') {
                            const link = `/docs/${entry.name}/${subEntry.name}/${nestedEntry.name.replace(/\.md$/, '')}`;
                            nestedItems.push({
                                text: nestedEntry.name.replace(/\.md$/, ''),
                                link: link
                            });
                        }
                    });

                    if (nestedItems.length > 0) { // 只有当 nestedItems 有内容时才添加
                        sidebar[basePath][0].items.push({
                            text: subEntry.name,
                            items: nestedItems
                        });
                    }
                } else if (subEntry.isFile() && subEntry.name.endsWith('.md') && subEntry.name !== 'index.md') {
                    // 处理 Markdown 文件，忽略 index.md
                    const link = `/docs/${entry.name}/${subEntry.name.replace(/\.md$/, '')}`;
                    sidebar[basePath][0].items.push({
                        text: subEntry.name.replace(/\.md$/, ''),
                        link: link
                    });
                }
            });
        }
    });

    return sidebar;
}

const sidebarConfig = generateSidebarConfig(docsPath);

// 格式化为最终的输出
const finalSidebarConfig = {};
for (const key in sidebarConfig) {
    finalSidebarConfig[key] = sidebarConfig[key];
}

const sidebarPath = path.resolve(__dirname, './docs/sidebar.json');
fs.writeFileSync(sidebarPath, JSON.stringify(finalSidebarConfig, null, 2));
