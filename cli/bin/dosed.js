#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const ASCII = `
██████╗  ██████╗ ███████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔══██╗
██║  ██║██║   ██║███████╗█████╗  ██║  ██║
██║  ██║██║   ██║╚════██║██╔══╝  ██║  ██║
██████╔╝╚██████╔╝███████║███████╗██████╔╝
╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═════╝
`;

const SKILLS = {
  // Workflow skills
  dosed: { type: 'workflow', desc: 'Task recommender - "What state should I use for X?"' },
  brainstorm: { type: 'workflow', desc: 'LSD-enhanced ideation for creative solutions' },
  'code-review': { type: 'workflow', desc: 'Amphetamine + Ketamine code review' },
  debug: { type: 'workflow', desc: 'LSD + Amphetamine debugging' },
  write: { type: 'workflow', desc: 'Alcohol draft + Amphetamine edit' },
  design: { type: 'workflow', desc: '2C-B + MDMA UI/UX design' },
  feedback: { type: 'workflow', desc: 'MDMA compassionate feedback' },
  // Substance skills
  lsd: { type: 'substance', desc: 'Pattern recognition, distant associations' },
  mdma: { type: 'substance', desc: 'Radical empathy, warmth, compassion' },
  psilocybin: { type: 'substance', desc: 'Mystical perspective, ego softening' },
  dmt: { type: 'substance', desc: 'Entity contact, reality replacement' },
  ketamine: { type: 'substance', desc: 'Objective distance, dissociation' },
  cannabis: { type: 'substance', desc: 'Time dilation, tangential thinking' },
  cocaine: { type: 'substance', desc: 'Supreme confidence, speed' },
  amphetamines: { type: 'substance', desc: 'Hyperfocus, detail orientation' },
  caffeine: { type: 'substance', desc: 'Alertness, focus, thoroughness' },
  opioids: { type: 'substance', desc: 'Warmth, contentment, acceptance' },
  alcohol: { type: 'substance', desc: 'Disinhibition, critic offline' },
  benzodiazepines: { type: 'substance', desc: 'Anxiety deletion, flat calm' },
  salvia: { type: 'substance', desc: 'Ontological confusion, bizarre' },
  '2cb': { type: 'substance', desc: 'Sensory enhancement, playful' },
  ghb: { type: 'substance', desc: 'Euphoria, social warmth' },
  nitrous: { type: 'substance', desc: 'Brief revelation, giggles' },
  mescaline: { type: 'substance', desc: 'Visual beauty, earth connection' }
};

const REPO_BASE = 'https://raw.githubusercontent.com/KrishnaShettyDev/dosed/main';

function log(msg) {
  console.log(msg);
}

function logSuccess(msg) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}

function logError(msg) {
  console.log(`\x1b[31m✗\x1b[0m ${msg}`);
}

function logInfo(msg) {
  console.log(`\x1b[36m→\x1b[0m ${msg}`);
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function installSkill(skillName) {
  const skill = SKILLS[skillName];
  if (!skill) {
    logError(`Unknown skill: ${skillName}`);
    log(`\nAvailable skills:`);
    Object.keys(SKILLS).forEach(s => {
      log(`  ${s.padEnd(16)} ${SKILLS[s].desc}`);
    });
    process.exit(1);
  }

  logInfo(`Installing ${skillName}...`);

  // Determine install directory
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const installDir = path.join(homeDir, '.agents', 'skills', skillName);

  // Create directory
  fs.mkdirSync(installDir, { recursive: true });

  // Fetch SKILL.md from GitHub
  const skillUrl = `${REPO_BASE}/${skillName}/SKILL.md`;

  try {
    const content = await fetch(skillUrl);
    const skillPath = path.join(installDir, 'SKILL.md');
    fs.writeFileSync(skillPath, content);
    logSuccess(`Installed ${skillName} to ${installDir}`);
  } catch (err) {
    logError(`Failed to fetch ${skillName}: ${err.message}`);
    process.exit(1);
  }
}

async function installAll() {
  log(ASCII);
  logInfo('Installing all DOSED skills...\n');

  for (const skillName of Object.keys(SKILLS)) {
    await installSkill(skillName);
  }

  log('\n');
  logSuccess('All skills installed!');
  log('\nUsage: Use /skillname in your AI agent (Claude Code, Cursor, etc.)');
}

function listSkills() {
  log(ASCII);
  log('Available skills:\n');

  log('\x1b[33mWorkflows:\x1b[0m');
  Object.entries(SKILLS)
    .filter(([_, s]) => s.type === 'workflow')
    .forEach(([name, s]) => {
      log(`  ${name.padEnd(16)} ${s.desc}`);
    });

  log('\n\x1b[33mSubstances:\x1b[0m');
  Object.entries(SKILLS)
    .filter(([_, s]) => s.type === 'substance')
    .forEach(([name, s]) => {
      log(`  ${name.padEnd(16)} ${s.desc}`);
    });

  log('\n\x1b[36mInstall:\x1b[0m npx dosed add <skill>');
  log('\x1b[36mInstall all:\x1b[0m npx dosed');
}

function showHelp() {
  log(ASCII);
  log('DOSED - Cognitive tools for AI agents\n');
  log('Usage:');
  log('  npx dosed              Install all skills');
  log('  npx dosed add <skill>  Install a specific skill');
  log('  npx dosed list         List available skills');
  log('  npx dosed help         Show this help\n');
  log('Website: https://get-dosed.vercel.app');
  log('GitHub:  https://github.com/KrishnaShettyDev/dosed');
}

// Main
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  // Default: install all
  installAll();
} else if (command === 'add' && args[1]) {
  log(ASCII);
  installSkill(args[1]);
} else if (command === 'list') {
  listSkills();
} else if (command === 'help' || command === '--help' || command === '-h') {
  showHelp();
} else {
  // Assume it's a skill name
  log(ASCII);
  installSkill(command);
}
