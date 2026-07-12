#!/bin/bash
# scripts/publish.sh - 一键部署脚本

echo ""
echo "╔══════════════════════════════════╗"
echo "║     🌿 一隅小记 · 一键部署      ║"
echo "╚══════════════════════════════════╝"
echo ""

echo "[1/3] 清理旧文件..."
hexo clean

echo ""
echo "[2/3] 生成静态文件..."
hexo generate

echo ""
echo "[3/3] 部署到 GitHub Pages..."
hexo deploy

echo ""
echo "╔══════════════════════════════════╗"
echo "║  ✅ 部署完成！                  ║"
echo "║  1-2 分钟后刷新网站即可看到更新 ║"
echo "╚══════════════════════════════════╝"
