import * as React from 'react';
import {
  Title,
  SearchInput,
  Button,
  ButtonVariant,
  ToggleGroup,
  ToggleGroupItem,
  Pagination,
  PaginationVariant,
  Nav,
  NavList,
  NavItem,
  Checkbox,
  Tabs,
  Tab,
  TabTitleText,
  Alert,
  AlertVariant
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@patternfly/react-table';
import { RepositoryIcon, PackageIcon } from '@patternfly/react-icons';

// Mock data types
interface Package {
  name: string;
  summary: string;
  repository: 'included' | 'other';
  source: 'Red Hat Repository' | 'Third Party Repository';
}

interface Repository {
  id: string;
  name: string;
  url: string;
  arch: string;
  version: string;
  packages: number;
  status: string;
}

// Mock data for demonstration
const includedRepoPackages: Package[] = [
  { name: 'httpd', summary: 'Apache HTTP Server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'nginx', summary: 'High performance web server', repository: 'included', source: 'Third Party Repository' },
  { name: 'postgresql', summary: 'PostgreSQL database server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'docker', summary: 'Docker container runtime', repository: 'included', source: 'Third Party Repository' },
  { name: 'ansible', summary: 'IT automation tool', repository: 'included', source: 'Red Hat Repository' },
  { name: 'git', summary: 'Version control system', repository: 'included', source: 'Red Hat Repository' },
  { name: 'vim', summary: 'Vi IMproved text editor', repository: 'included', source: 'Red Hat Repository' },
  { name: 'wget', summary: 'Retrieve files from the web', repository: 'included', source: 'Red Hat Repository' },
  { name: 'curl', summary: 'Transfer data from or to a server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'python3', summary: 'Python 3 programming language', repository: 'included', source: 'Red Hat Repository' },
  { name: 'ssh', summary: 'Secure Shell client and server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'systemd', summary: 'System and service manager', repository: 'included', source: 'Red Hat Repository' },
  { name: 'sudo', summary: 'Execute command as superuser', repository: 'included', source: 'Red Hat Repository' },
  { name: 'sed', summary: 'Stream editor for filtering text', repository: 'included', source: 'Red Hat Repository' },
  { name: 'screen', summary: 'Terminal multiplexer', repository: 'included', source: 'Red Hat Repository' },
  { name: 'strace', summary: 'Trace system calls and signals', repository: 'included', source: 'Red Hat Repository' },
  { name: 'samba', summary: 'SMB/CIFS file and print server', repository: 'included', source: 'Third Party Repository' },
  { name: 'snmp', summary: 'Simple Network Management Protocol', repository: 'included', source: 'Red Hat Repository' },
  { name: 'squid', summary: 'Web proxy cache', repository: 'included', source: 'Third Party Repository' },
  { name: 'sendmail', summary: 'Mail transfer agent', repository: 'included', source: 'Red Hat Repository' },
  { name: 'apache', summary: 'Apache web server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'bind', summary: 'Berkeley Internet Name Domain', repository: 'included', source: 'Red Hat Repository' },
  { name: 'bash', summary: 'Bourne Again Shell', repository: 'included', source: 'Red Hat Repository' },
  { name: 'busybox', summary: 'Multi-call binary', repository: 'included', source: 'Third Party Repository' },
  { name: 'bc', summary: 'Arbitrary precision calculator', repository: 'included', source: 'Red Hat Repository' },
  { name: 'bzip2', summary: 'Block-sorting file compressor', repository: 'included', source: 'Red Hat Repository' },
  { name: 'buildah', summary: 'Container image builder', repository: 'included', source: 'Red Hat Repository' },
  { name: 'cron', summary: 'Daemon for executing scheduled commands', repository: 'included', source: 'Red Hat Repository' },
  { name: 'cups', summary: 'Common Unix Printing System', repository: 'included', source: 'Red Hat Repository' },
  { name: 'clamav', summary: 'Antivirus software', repository: 'included', source: 'Third Party Repository' },
  { name: 'cryptsetup', summary: 'Disk encryption setup utility', repository: 'included', source: 'Red Hat Repository' },
  { name: 'dhcpd', summary: 'DHCP server daemon', repository: 'included', source: 'Red Hat Repository' },
  { name: 'dnsmasq', summary: 'Lightweight DNS forwarder', repository: 'included', source: 'Third Party Repository' },
  { name: 'dovecot', summary: 'IMAP and POP3 server', repository: 'included', source: 'Third Party Repository' },
  { name: 'fail2ban', summary: 'Intrusion prevention software', repository: 'included', source: 'Third Party Repository' },
  { name: 'firewalld', summary: 'Dynamic firewall daemon', repository: 'included', source: 'Red Hat Repository' },
  { name: 'freeradius', summary: 'RADIUS server', repository: 'included', source: 'Third Party Repository' },
  { name: 'gcc', summary: 'GNU Compiler Collection', repository: 'included', source: 'Red Hat Repository' },
  { name: 'glibc', summary: 'GNU C Library', repository: 'included', source: 'Red Hat Repository' },
  { name: 'gnupg', summary: 'GNU Privacy Guard', repository: 'included', source: 'Red Hat Repository' },
  { name: 'haproxy', summary: 'Load balancer and proxy', repository: 'included', source: 'Third Party Repository' },
  { name: 'httpd-tools', summary: 'Apache HTTP Server tools', repository: 'included', source: 'Red Hat Repository' },
  { name: 'iptables', summary: 'Linux packet filtering', repository: 'included', source: 'Red Hat Repository' },
  { name: 'java', summary: 'Java Runtime Environment', repository: 'included', source: 'Red Hat Repository' },
  { name: 'kernel', summary: 'Linux kernel', repository: 'included', source: 'Red Hat Repository' },
  { name: 'libvirt', summary: 'Virtualization library', repository: 'included', source: 'Red Hat Repository' },
  { name: 'logrotate', summary: 'Log file rotation utility', repository: 'included', source: 'Red Hat Repository' },
  { name: 'mariadb', summary: 'Database server', repository: 'included', source: 'Third Party Repository' },
  { name: 'memcached', summary: 'Memory caching daemon', repository: 'included', source: 'Third Party Repository' },
  { name: 'nagios', summary: 'Network monitoring system', repository: 'included', source: 'Third Party Repository' },
  { name: 'netcat', summary: 'Network utility', repository: 'included', source: 'Red Hat Repository' },
  { name: 'openssh', summary: 'OpenSSH client and server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'openvpn', summary: 'VPN solution', repository: 'included', source: 'Third Party Repository' },
  { name: 'php', summary: 'PHP scripting language', repository: 'included', source: 'Third Party Repository' },
  { name: 'podman', summary: 'Container engine', repository: 'included', source: 'Red Hat Repository' },
  { name: 'qemu', summary: 'Machine emulator and virtualizer', repository: 'included', source: 'Red Hat Repository' },
  { name: 'redis', summary: 'In-memory data structure store', repository: 'included', source: 'Third Party Repository' },
  { name: 'rsyslog', summary: 'System logging service', repository: 'included', source: 'Red Hat Repository' },
  { name: 'rpm', summary: 'RPM Package Manager', repository: 'included', source: 'Red Hat Repository' },
  { name: 'selinux', summary: 'Security-Enhanced Linux', repository: 'included', source: 'Red Hat Repository' },
  { name: 'tcpdump', summary: 'Network packet analyzer', repository: 'included', source: 'Red Hat Repository' },
  { name: 'tmux', summary: 'Terminal multiplexer', repository: 'included', source: 'Third Party Repository' },
  { name: 'unzip', summary: 'Extract files from ZIP archives', repository: 'included', source: 'Red Hat Repository' },
  { name: 'varnish', summary: 'HTTP accelerator', repository: 'included', source: 'Third Party Repository' },
  { name: 'wireshark', summary: 'Network protocol analyzer', repository: 'included', source: 'Third Party Repository' },
  { name: 'xinetd', summary: 'Extended Internet Services daemon', repository: 'included', source: 'Red Hat Repository' },
  { name: 'yum', summary: 'Package manager', repository: 'included', source: 'Red Hat Repository' },
  { name: 'zsh', summary: 'Z shell', repository: 'included', source: 'Red Hat Repository' },
];

const otherRepoPackages: Package[] = [
  { name: 'epel-release', summary: 'Extra Packages for Enterprise Linux', repository: 'other', source: 'Red Hat Repository' },
  { name: 'elasticsearch', summary: 'Distributed search and analytics engine', repository: 'other', source: 'Third Party Repository' },
  { name: 'kibana', summary: 'Data visualization and exploration platform', repository: 'other', source: 'Third Party Repository' },
  { name: 'logstash', summary: 'Data processing pipeline', repository: 'other', source: 'Third Party Repository' },
  { name: 'grafana', summary: 'Metrics visualization and alerting', repository: 'other', source: 'Third Party Repository' },
  { name: 'prometheus', summary: 'Monitoring system and time series database', repository: 'other', source: 'Third Party Repository' },
  { name: 'nodejs', summary: 'JavaScript runtime built on Chrome V8', repository: 'other', source: 'Third Party Repository' },
  { name: 'npm', summary: 'Node.js package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'ruby', summary: 'Object-oriented programming language', repository: 'other', source: 'Red Hat Repository' },
  { name: 'gems', summary: 'Ruby package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'go', summary: 'Go programming language', repository: 'other', source: 'Third Party Repository' },
  { name: 'rust', summary: 'Systems programming language', repository: 'other', source: 'Third Party Repository' },
  { name: 'cargo', summary: 'Rust package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'terraform', summary: 'Infrastructure as code tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'packer', summary: 'Machine image creation tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'vagrant', summary: 'Development environment manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'chef', summary: 'Configuration management tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'puppet', summary: 'Configuration management platform', repository: 'other', source: 'Red Hat Repository' },
  { name: 'salt', summary: 'Infrastructure management tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'jenkins', summary: 'Automation server', repository: 'other', source: 'Third Party Repository' },
  { name: 'gitlab', summary: 'Git repository management', repository: 'other', source: 'Third Party Repository' },
  { name: 'jira', summary: 'Issue and project tracking', repository: 'other', source: 'Third Party Repository' },
  { name: 'confluence', summary: 'Team collaboration software', repository: 'other', source: 'Third Party Repository' },
  { name: 'bitbucket', summary: 'Git code hosting service', repository: 'other', source: 'Third Party Repository' },
  { name: 'sonarqube', summary: 'Code quality and security platform', repository: 'other', source: 'Third Party Repository' },
  { name: 'nexus', summary: 'Repository manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'artifactory', summary: 'Binary repository manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'maven', summary: 'Build automation tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'gradle', summary: 'Build automation tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'ant', summary: 'Build tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'make', summary: 'Build automation tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'cmake', summary: 'Cross-platform build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'ninja', summary: 'Small build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'bazel', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'buck', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'pants', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'please', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'scons', summary: 'Build system', repository: 'other', source: 'Red Hat Repository' },
  { name: 'waf', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'meson', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'autotools', summary: 'Build system', repository: 'other', source: 'Red Hat Repository' },
  { name: 'conan', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'vcpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'spack', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'conda', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pip', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'gem', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'cpan', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'cabal', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'stack', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'nuget', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'chocolatey', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'scoop', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'winget', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'homebrew', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'apt', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'dnf', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'zypper', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pacman', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'xbps', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'nix', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'guix', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'flatpak', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'snap', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'appimage', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'rpm', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'dpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'brew', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'port', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'fink', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'macports', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkgsrc', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slackpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slapt-get', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'swaret', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'netpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkgtool', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slackpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slapt-get', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'swaret', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'netpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkgtool', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
];

const mockRepositories: Repository[] = [
  { id: 'repo1', name: 'EPEL Repository', url: 'https://dl.fedoraproject.org/pub/epel/', arch: 'x86_64', version: '8', packages: 15000, status: 'Active' },
  { id: 'repo2', name: 'RPM Fusion', url: 'https://rpmfusion.org/', arch: 'x86_64', version: '8', packages: 8000, status: 'Active' },
  { id: 'repo3', name: 'Custom Internal', url: 'https://internal.company.com/repos/', arch: 'x86_64', version: '8', packages: 2500, status: 'Active' },
  { id: 'repo4', name: 'Development Tools', url: 'https://dev.company.com/repos/', arch: 'x86_64', version: '8', packages: 1200, status: 'Active' },
  { id: 'repo5', name: 'Testing Repository', url: 'https://test.company.com/repos/', arch: 'x86_64', version: '8', packages: 800, status: 'Active' },
  { id: 'repo6', name: 'Staging Repository', url: 'https://staging.company.com/repos/', arch: 'x86_64', version: '8', packages: 600, status: 'Active' },
  { id: 'repo7', name: 'Production Repository', url: 'https://prod.company.com/repos/', arch: 'x86_64', version: '8', packages: 400, status: 'Active' },
  { id: 'repo8', name: 'Archive Repository', url: 'https://archive.company.com/repos/', arch: 'x86_64', version: '8', packages: 200, status: 'Active' },
];

export const AdditionalPackages: React.FunctionComponent = () => {
  // State for packages
  const [searchTerm, setSearchTerm] = React.useState('');
  const [toggleSelected, setToggleSelected] = React.useState<'toggle-available' | 'toggle-selected'>('toggle-available');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [selectedPackages, setSelectedPackages] = React.useState<Set<string>>(new Set(['openssh', 'firewalld', 'selinux', 'rsyslog']));
  const [activeTabKey, setActiveTabKey] = React.useState('included-repos');
  const [hasViewedSelected, setHasViewedSelected] = React.useState(false);
  const [hasViewedPackagesSelected, setHasViewedPackagesSelected] = React.useState(false);

  // State for repositories
  const [selectedRepositories, setSelectedRepositories] = React.useState<Set<string>>(new Set(['repo1', 'repo2']));
  const [reposToggleSelected, setReposToggleSelected] = React.useState<'toggle-repos-all' | 'toggle-repos-selected'>('toggle-repos-all');
  const [hasViewedReposSelected, setHasViewedReposSelected] = React.useState(false);

  // State for step management
  const [showAsOneStep, setShowAsOneStep] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState('custom-repositories');
  const [enableToggles, setEnableToggles] = React.useState(true);

  // Computed values for packages
  const selectedCount = selectedPackages.size;
  const totalAvailableItems = includedRepoPackages.length + otherRepoPackages.length;

  // Filter packages based on search term and active tab
  const filteredPackages = React.useMemo(() => {
    const sourcePackages = activeTabKey === 'included-repos' ? includedRepoPackages : otherRepoPackages;
    let filtered = sourcePackages.filter(pkg => {
      const nameMatch = pkg.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      return nameMatch;
    });
    return filtered;
  }, [searchTerm, activeTabKey]);

  // Apply toggle filtering (Available/Selected)
  const toggleFilteredPackages = React.useMemo(() => {
    let filtered = [...filteredPackages];
    if (toggleSelected === 'toggle-selected') {
      filtered = filtered.filter(pkg => selectedPackages.has(pkg.name));
      if (!hasViewedPackagesSelected) {
        setHasViewedPackagesSelected(true);
      }
    }
    return filtered;
  }, [filteredPackages, toggleSelected, selectedPackages, hasViewedPackagesSelected]);

  // Paginate packages
  const paginatedPackages = React.useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return toggleFilteredPackages.slice(startIndex, startIndex + perPage);
  }, [toggleFilteredPackages, page, perPage]);

  // Total items for pagination
  const totalItems = toggleFilteredPackages.length;

  // Filter repositories
  const filteredRepositories = React.useMemo(() => {
    let filtered = [...mockRepositories];
    
    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply toggle filtering
    if (reposToggleSelected === 'toggle-repos-selected') {
      filtered = filtered.filter(repo => selectedRepositories.has(repo.id));
      if (!hasViewedReposSelected) {
        setHasViewedReposSelected(true);
      }
    }
    
    return filtered;
  }, [searchTerm, reposToggleSelected, selectedRepositories, hasViewedReposSelected]);

  // Event handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setPage(1);
    // Note: selected packages should persist
  };

  const handleToggleChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    // For PatternFly ToggleGroupItem, we need to handle this differently
    // The selected state tells us which button was clicked
    if (selected) {
      // This means the button was selected, so we need to determine which one
      // We'll use a different approach - create separate handlers for each button
    }
    setPage(1);
  };

  const handleAvailableToggle = () => {
    setToggleSelected('toggle-available');
    setPage(1);
  };

  const handleSelectedToggle = () => {
    setToggleSelected('toggle-selected');
    setPage(1);
  };

  const handlePackageSelect = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const packageName = event.currentTarget.getAttribute('data-package-name');
    if (packageName) {
      const newSelected = new Set(selectedPackages);
      if (selected) {
        newSelected.add(packageName);
      } else {
        newSelected.delete(packageName);
      }
      setSelectedPackages(newSelected);
    }
  };

  const handleRepositorySelect = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const repoId = event.currentTarget.getAttribute('data-repo-id');
    if (repoId) {
      const newSelected = new Set(selectedRepositories);
      if (selected) {
        newSelected.add(repoId);
      } else {
        newSelected.delete(repoId);
      }
      setSelectedRepositories(newSelected);
    }
  };

  const handleReposToggleChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const buttonId = event.currentTarget.getAttribute('data-button-id');
    if (buttonId === 'toggle-repos-all') {
      setReposToggleSelected('toggle-repos-all');
    } else if (buttonId === 'toggle-repos-selected') {
      setReposToggleSelected('toggle-repos-selected');
    }
  };

  const handleReposAllToggle = () => {
    setReposToggleSelected('toggle-repos-all');
  };

  const handleReposSelectedToggle = () => {
    setReposToggleSelected('toggle-repos-selected');
  };

  const handleSelectAllRepositories = (checked: boolean) => {
    if (checked) {
      // Select all filtered repositories
      const allRepoIds = filteredRepositories.map(repo => repo.id);
      setSelectedRepositories(new Set(allRepoIds));
    } else {
      // Deselect all repositories
      setSelectedRepositories(new Set());
    }
  };

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId);
  };

  const onSetPage = (_event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  // Add custom CSS for navigation styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-nav-item {
        margin-bottom: 8px;
        border-radius: 6px;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      /* Target multiple possible PatternFly v5 selectors */
      .custom-nav-item .pf-c-nav__link,
      .custom-nav-item .pf-v5-c-nav__link,
      .custom-nav-item a,
      .custom-nav-item button {
        background-color: transparent !important;
        border: none !important;
      }

      /* Active state - target multiple selectors */
      .custom-nav-item.pf-m-current .pf-c-nav__link,
      .custom-nav-item.pf-m-current .pf-v5-c-nav__link,
      .custom-nav-item.pf-m-current a,
      .custom-nav-item.pf-m-current button {
        background-color: #e7f1ff !important;
        border: 2px solid #0066cc !important;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 102, 204, 0.1);
      }

      /* Inactive state - target multiple selectors */
      .custom-nav-item:not(.pf-m-current) .pf-c-nav__link,
      .custom-nav-item:not(.pf-m-current) .pf-v5-c-nav__link,
      .custom-nav-item:not(.pf-m-current) a,
      .custom-nav-item:not(.pf-m-current) button {
        background-color: #ffffff !important;
        border: 2px solid #d1d1d1 !important;
        border-radius: 6px;
      }

      /* Nuclear option: override ALL possible PatternFly backgrounds */
      .custom-nav-item * {
        background-color: inherit !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderCustomRepositories = () => (
    <div style={{ padding: '20px 0' }}>
      <div style={{ marginBottom: '20px' }}>
        <Title headingLevel="h1" size="xl">
          Custom repositories
        </Title>
        <p style={{ fontSize: '1rem', color: '#666', margin: '10px 0 0 0' }}>
          Select the linked custom repositories from which you can add packages to the image
        </p>
      </div>

      {/* Toolbar with controls */}
      <div style={{ 
        margin: '20px 0', 
        display: 'flex', 
        gap: '16px', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        padding: '16px'
      }}>
        <div style={{ width: '300px' }}>
          <SearchInput
            placeholder="Filter repositories"
            value={searchTerm}
            onChange={(event, value) => handleSearch(value)}
            onClear={handleClear}
            aria-label="Filter repositories"
          />
        </div>
        
        <Button variant={ButtonVariant.primary}>
          Refresh
        </Button>



        <ToggleGroup aria-label="Filter repositories list" disabled={!enableToggles}>
          <ToggleGroupItem
            text={`All${mockRepositories ? ` (${hasViewedReposSelected ? mockRepositories.length - selectedRepositories.size : mockRepositories.length})` : ''}`}
            aria-label="All repositories"
            buttonId="toggle-repos-all"
            isSelected={reposToggleSelected === 'toggle-repos-all'}
            onChange={() => handleReposAllToggle()}
          />
          <ToggleGroupItem
            text={`Selected${selectedRepositories.size ? ` (${selectedRepositories.size})` : ''}`}
            aria-label="Selected repositories"
            buttonId="toggle-repos-selected"
            isSelected={reposToggleSelected === 'toggle-repos-selected'}
            onChange={() => handleReposSelectedToggle()}
          />
        </ToggleGroup>
      </div>

      {/* Repositories Table */}
      <Table aria-label="Custom repositories table" variant="compact">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                id="select-all-repos"
                isChecked={selectedRepositories.size === filteredRepositories.length && filteredRepositories.length > 0}
                onChange={(event, checked) => handleSelectAllRepositories(checked)}
                aria-label="Select all repositories"
              />
            </Th>
            <Th width={45}>Name</Th>
            <Th width={15}>Architecture</Th>
            <Th>Version</Th>
            <Th width={10}>Packages</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRepositories.map((repo) => (
            <Tr key={repo.id}>
              <Td>
                <Checkbox
                  id={repo.id}
                  isChecked={selectedRepositories.has(repo.id)}
                  onChange={(event, checked) => handleRepositorySelect(event, checked)}
                  aria-label="Select repository"
                  data-repo-id={repo.id}
                />
              </Td>
              <Td>
                <div>
                  <strong>{repo.name}</strong>
                  <br />
                  <Button
                    component="a"
                    target="_blank"
                    variant="link"
                    isInline
                    href={repo.url}
                  >
                    {repo.url}
                  </Button>
                </div>
              </Td>
              <Td>{repo.arch}</Td>
              <Td>{repo.version}</Td>
              <Td>{repo.packages.toLocaleString()}</Td>
              <Td>
                <span style={{ color: 'green' }}>{repo.status}</span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          itemCount={2}
          perPage={10}
          page={1}
          onSetPage={() => {}}
          onPerPageSelect={() => {}}
          variant={PaginationVariant.bottom}
        />
      </div>
    </div>
  );

  const renderAdditionalPackages = () => {
    return (
      <div style={{ padding: '20px 0' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <Title headingLevel="h1" size="xl">
            Additional packages
          </Title>
          <p style={{ fontSize: '1rem', color: '#666', margin: '10px 0 0 0' }}>
            Blueprints created with Images include all required packages.
          </p>
        </div>

        <Alert variant={AlertVariant.info} isInline title="Search for package groups">
          Search for package groups by starting your search with the '@' character. A single '@' as search input lists all available package groups.
        </Alert>
      


        {/* Search and Controls */}
        <div style={{ margin: '20px 0', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '300px' }}>
            <SearchInput
              placeholder="Search packages"
              value={searchTerm}
              onChange={(event, value) => handleSearch(value)}
              onClear={handleClear}
              aria-label="Search packages"
            />
          </div>
          

          
          <ToggleGroup disabled={!enableToggles}>
            <ToggleGroupItem
              text={`Available${searchTerm && filteredPackages.length > 0 ? (hasViewedPackagesSelected ? ` (${Math.max(0, filteredPackages.length - selectedCount)})` : ` (${filteredPackages.length})`) : ''}`}
              buttonId="toggle-available"
              isSelected={toggleSelected === 'toggle-available'}
              onChange={() => handleAvailableToggle()}
            />
            <ToggleGroupItem
              text={`Selected${selectedCount ? ` (${selectedCount})` : ''}`}
              buttonId="toggle-selected"
              isSelected={toggleSelected === 'toggle-selected'}
              onChange={() => handleSelectedToggle()}
            />
          </ToggleGroup>

          <div style={{ marginLeft: 'auto' }}>
            <span>Items per page: </span>
            <select 
              value={perPage} 
              onChange={(e) => setPerPage(Number(e.target.value))}
              style={{ padding: '5px', marginLeft: '5px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div style={{ marginTop: '20px' }}>
          <Tabs
            activeKey={activeTabKey}
            onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex.toString())}
            aria-label="Repositories tabs on packages step"
          >
            <Tab
              eventKey="included-repos"
              title={<TabTitleText>Included repos</TabTitleText>}
              aria-label="Included repositories"
            />
            <Tab
              eventKey="other-repos"
              title={<TabTitleText>Other repos</TabTitleText>}
              aria-label="Other repositories"
            />
          </Tabs>
        </div>

        {/* Packages Display using Table */}
        {(searchTerm || toggleSelected === 'toggle-selected') ? (
          <Table aria-label="Packages table" variant="compact">
            <Thead>
              <Tr>
                <Th aria-label="Select item"></Th>
                <Th>Name</Th>
                <Th>Source</Th>
                <Th>Summary</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedPackages.map((pkg) => (
                <Tr key={pkg.name}>
                  <Td>
                    <Checkbox
                      id={`package-${pkg.name}`}
                      isChecked={selectedPackages.has(pkg.name)}
                      onChange={(event, checked) => handlePackageSelect(event, checked)}
                      aria-label={`Select package ${pkg.name}`}
                      data-package-name={pkg.name}
                    />
                  </Td>
                  <Td>{pkg.name}</Td>
                  <Td>{pkg.source}</Td>
                  <Td>{pkg.summary}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : null}

        {/* Pagination */}
        {totalItems > perPage && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Pagination
              itemCount={totalItems}
              perPage={perPage}
              page={page}
              onSetPage={onSetPage}
              onPerPageSelect={onPerPageSelect}
              variant={PaginationVariant.bottom}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: '1200px',
        height: '800px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          {/* Top Control Panel */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #d1d1d1',
            padding: '20px',
            zIndex: 1000,
            flexShrink: 0
          }}>
            {/* Feature Toggles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: showAsOneStep ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setShowAsOneStep(!showAsOneStep)}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: showAsOneStep ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-two-steps" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Combine steps
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: enableToggles ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setEnableToggles(!enableToggles)}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: enableToggles ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-toggles" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Enable toggles
                </label>
              </div>
            </div>
          </div>

          {/* Main Content with Sidebar */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left Sidebar Navigation */}
            <div style={{ 
              width: '250px', 
              backgroundColor: '#f8f9fa', 
              borderRight: '1px solid #d1d1d1',
              padding: '20px',
              overflowY: 'auto',
              flexShrink: 0
            }}>
              <Nav onSelect={(event, itemId) => {
                const stepId = typeof itemId === 'string' ? itemId : itemId.itemId;
                handleStepChange(stepId);
              }}>
                <NavList>
                  {showAsOneStep ? (
                    /* Combined Step Navigation */
                    <NavItem 
                      itemId="packages-and-repositories" 
                      isActive={true}
                      className="custom-nav-item"
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: '#0066cc'
                      }}>
                        <PackageIcon style={{ 
                          marginRight: '12px', 
                          color: '#0066cc'
                        }} />
                        <span style={{ 
                          fontWeight: '600'
                        }}>
                          Packages and Repositories
                        </span>
                      </div>
                    </NavItem>
                  ) : (
                    /* Two Step Navigation */
                    <>
                      <NavItem 
                        itemId="custom-repositories" 
                        isActive={activeStep === 'custom-repositories'}
                        className="custom-nav-item"
                      >
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: activeStep === 'custom-repositories' ? '#0066cc' : '#333'
                        }}>
                          <RepositoryIcon style={{ 
                            marginRight: '12px', 
                            color: activeStep === 'custom-repositories' ? '#0066cc' : '#666'
                          }} />
                          <span style={{ 
                            fontWeight: activeStep === 'custom-repositories' ? '600' : '400'
                          }}>
                            Step 1: Custom Repositories
                          </span>
                        </div>
                      </NavItem>
                      <NavItem 
                        itemId="additional-packages" 
                        isActive={activeStep === 'additional-packages'}
                        className="custom-nav-item"
                      >
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: activeStep === 'additional-packages' ? '#0066cc' : '#666'
                        }}>
                          <PackageIcon style={{ 
                            marginRight: '12px', 
                            color: activeStep === 'additional-packages' ? '#0066cc' : '#666'
                          }} />
                          <span style={{ 
                            fontWeight: activeStep === 'additional-packages' ? '600' : '400'
                          }}>
                            Step 2: Additional Packages
                          </span>
                        </div>
                      </NavItem>
                    </>
                  )}
                </NavList>
              </Nav>
            </div>

            {/* Main Content Area */}
            <div style={{ 
              flex: 1, 
              padding: '20px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}>
              {showAsOneStep ? (
                /* Combined View - Show all content */
                <>
                  {/* Custom Repositories Step */}
                  <div style={{ marginBottom: '20px' }}>
                    {renderCustomRepositories()}
                  </div>

                  {/* Additional Packages Step */}
                  <div>
                    {renderAdditionalPackages()}
                  </div>
                </>
              ) : (
                /* Two Step View - Show content based on active step */
                <>
                  {/* Custom Repositories Step */}
                  <div style={{ 
                    marginBottom: '40px',
                    display: activeStep === 'custom-repositories' ? 'block' : 'none'
                  }}>
                    {renderCustomRepositories()}
                  </div>

                  {/* Additional Packages Step */}
                  <div style={{
                    display: activeStep === 'additional-packages' ? 'block' : 'none'
                  }}>
                    {renderAdditionalPackages()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalPackages;
