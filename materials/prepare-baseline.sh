#!/usr/bin/env bash
set -euo pipefail

upstream='https://github.com/super-productivity/super-productivity.git'
commit='93d5249d51f4fcfb9ccaab14a89438ae52925a10'
branch='vs-productivity-base'
repo_dir="${1:-$HOME/Documents/GitHub/super-productivity-workshop}"

if [[ -e "$repo_dir" || -L "$repo_dir" ]]; then
  printf 'Target already exists: %s\nChoose a new directory.\n' "$repo_dir" >&2
  exit 1
fi

command -v git >/dev/null || {
  printf 'Git is required. Install the macOS command line tools first.\n' >&2
  exit 1
}
mkdir -p "$repo_dir"
git -C "$repo_dir" init --quiet
git -C "$repo_dir" remote add origin "$upstream"
git -C "$repo_dir" fetch --no-tags --depth=1 origin "$commit"
git -C "$repo_dir" switch --create "$branch" "$commit"
actual="$(git -C "$repo_dir" rev-parse HEAD)"
test "$actual" = "$commit"
printf 'Repository: %s\nBranch: %s\nCommit: %s\n' "$repo_dir" "$branch" "$actual"
