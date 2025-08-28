import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Alert,
  AlertVariant,
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
  PageSidebar,
  Page,
  PageGroup,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  Tabs,
  Tab,
  TabTitleText,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ExpandableRowContent,
} from '@patternfly/react-table';
import { RepositoryIcon, PackageIcon } from '@patternfly/react-icons';

// Mock data types based on the osbuild implementation
interface Package {
  name: string;
  summary: string;
  repository: 'distro' | 'custom' | 'recommended';
  type?: string;
  module_name?: string;
  stream?: string;
  end_date?: string;
}



// Mock data for demonstration
const mockPackages: Package[] = [
  { name: 'httpd', summary: 'Apache HTTP Server', repository: 'distro' },
  { name: 'nginx', summary: 'High performance web server', repository: 'distro' },
  { name: 'postgresql', summary: 'PostgreSQL database server', repository: 'distro' },
  { name: 'docker', summary: 'Docker container runtime', repository: 'distro' },
  { name: 'ansible', summary: 'IT automation tool', repository: 'distro' },
  { name: 'git', summary: 'Version control system', repository: 'distro' },
  { name: 'vim', summary: 'Vi IMproved text editor', repository: 'distro' },
  { name: 'wget', summary: 'Retrieve files from the web', repository: 'distro' },
  { name: 'curl', summary: 'Transfer data from or to a server', repository: 'distro' },
  { name: 'python3', summary: 'Python 3 programming language', repository: 'distro' },
];



// Mock repositories data
const mockRepositories = [
  { id: 'repo-1', name: 'EPEL Repository', url: 'https://dl.fedoraproject.org/pub/epel/', arch: 'x86_64', version: '8', packages: 12847, status: 'Valid' },
  { id: 'repo-2', name: 'Custom RPM Repository', url: 'https://example.com/custom-repo/', arch: 'x86_64', version: '8', packages: 156, status: 'Valid' }
];

export const AdditionalPackages: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [toggleSelected, setToggleSelected] = React.useState<'toggle-available' | 'toggle-selected'>('toggle-available');

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
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [selectedPackages, setSelectedPackages] = React.useState<Set<string>>(new Set());


  const [selectedRepositories, setSelectedRepositories] = React.useState<Set<string>>(new Set());
  const [reposToggleSelected, setReposToggleSelected] = React.useState<'toggle-repos-all' | 'toggle-repos-selected'>('toggle-repos-all');
  const [hasViewedSelected, setHasViewedSelected] = React.useState(false);
  const [hasViewedPackagesSelected, setHasViewedPackagesSelected] = React.useState(false);
  const [showAsOneStep, setShowAsOneStep] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState('custom-repositories');
  const [activeTabKey, setActiveTabKey] = React.useState('included-repos');


  // Filtered data based on search
  const allFilteredPackages = React.useMemo(() => {
    return mockPackages.filter(pkg =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);



  const filteredPackages = React.useMemo(() => {
    let filtered = mockPackages.filter(pkg =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply toggle filter
    if (toggleSelected === 'toggle-selected') {
      // Show only selected packages
      filtered = filtered.filter(pkg => selectedPackages.has(pkg.name));
    } else {
      // "Available" toggle - hide selected packages only after user has viewed "Selected" list
      if (hasViewedPackagesSelected) {
        filtered = filtered.filter(pkg => !selectedPackages.has(pkg.name));
      }
      // If hasn't viewed "Selected" yet, show all packages
    }
    
    return filtered;
  }, [searchTerm, toggleSelected, selectedPackages, hasViewedPackagesSelected]);



  // Pagination
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPackages = filteredPackages.slice(startIndex, endIndex);


  // Event handlers
  const handleSearch = (event: React.FormEvent<HTMLInputElement>, value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setPage(1);
  };

  const handleToggleChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const buttonId = event.currentTarget.getAttribute('id');
    console.log('Toggle change event:', { buttonId, selected, event: event.currentTarget });
    if (buttonId && (buttonId === 'toggle-available' || buttonId === 'toggle-selected')) {
      console.log('Setting toggle to:', buttonId);
      setToggleSelected(buttonId as 'toggle-available' | 'toggle-selected');
      setPage(1); // Reset to first page when switching views
      
      // Track when user views the "Selected" list for packages
      if (buttonId === 'toggle-selected') {
        setHasViewedPackagesSelected(true);
      }
      
      console.log('State update called for:', buttonId);
    } else {
      console.log('Button ID not found or invalid:', buttonId);
    }
  };

  const handlePackageSelect = (event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    const packageName = event.currentTarget.getAttribute('data-package-name');
    if (packageName) {
      const newSelected = new Set(selectedPackages);
      if (checked) {
        newSelected.add(packageName);
      } else {
        newSelected.delete(packageName);
      }
      setSelectedPackages(newSelected);
    }
  };





  const handleRepositorySelect = (event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    const repoId = event.currentTarget.getAttribute('id');
    if (repoId) {
      const newSelected = new Set(selectedRepositories);
      if (checked) {
        newSelected.add(repoId);
      } else {
        newSelected.delete(repoId);
      }
      setSelectedRepositories(newSelected);
    }
  };

  const handleReposToggleChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const buttonId = event.currentTarget.getAttribute('id');
    console.log('Repos toggle change event:', { buttonId, selected, event: event.currentTarget });
    if (buttonId && (buttonId === 'toggle-repos-all' || buttonId === 'toggle-repos-selected')) {
      console.log('Setting repos toggle to:', buttonId);
      setReposToggleSelected(buttonId as 'toggle-repos-all' | 'toggle-repos-selected');
      
      // Track when user views the "Selected" list
      if (buttonId === 'toggle-repos-selected') {
        setHasViewedSelected(true);
      }
    } else {
      console.log('Repos button ID not found or invalid:', buttonId);
    }
  };

  // Use inline handlers to match PF v6 types
  const onSetPage = (
    _event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    newPage: number
  ) => setPage(newPage);

  const onPerPageSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    newPerPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  const totalAvailableItems = mockPackages.length;
  const totalItems = filteredPackages.length;
  const selectedCount = selectedPackages.size;
  
  // Filtered repositories based on toggle state
  const filteredRepositories = React.useMemo(() => {
    let filtered = mockRepositories.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply toggle filter
    if (reposToggleSelected === 'toggle-repos-selected') {
      // Show only selected repositories
      filtered = filtered.filter(repo => selectedRepositories.has(repo.id));
    } else {
      // "All" toggle - hide selected repos only after user has viewed "Selected" list
      if (hasViewedSelected) {
        filtered = filtered.filter(repo => !selectedRepositories.has(repo.id));
      }
      // If hasn't viewed "Selected" yet, show all repos
    }
    
    return filtered;
  }, [searchTerm, reposToggleSelected, selectedRepositories, hasViewedSelected]);
  
  // Debug logging
  console.log('Toggle state:', { toggleSelected, selectedCount, totalItems, totalAvailableItems });
  console.log('Repos toggle state:', { reposToggleSelected, selectedRepositories: selectedRepositories.size });
  console.log('Filtered data:', { 
    packages: filteredPackages.length, 
    selectedPackages: Array.from(selectedPackages)
  });

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId);
  };

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
            onChange={handleSearch}
            onClear={handleClear}
            aria-label="Filter repositories"
          />
        </div>
        
        <Button variant={ButtonVariant.primary}>
          Refresh
        </Button>

        <ToggleGroup aria-label="Filter repositories list">
          <ToggleGroupItem
            text={`All${mockRepositories ? ` (${hasViewedSelected ? mockRepositories.length - selectedRepositories.size : mockRepositories.length})` : ''}`}
            aria-label="All repositories"
            buttonId="toggle-repos-all"
            isSelected={reposToggleSelected === 'toggle-repos-all'}
            onChange={handleReposToggleChange}
          />
          <ToggleGroupItem
            text={`Selected${selectedRepositories.size ? ` (${selectedRepositories.size})` : ''}`}
            aria-label="Selected repositories"
            buttonId="toggle-repos-selected"
            isSelected={reposToggleSelected === 'toggle-repos-selected'}
            onChange={handleReposToggleChange}
          />
        </ToggleGroup>
      </div>

      {/* Repositories Table */}
      <Table aria-label="Custom repositories table" variant="compact">
        <Thead>
          <Tr>
            <Th aria-label="Select repository"></Th>
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
                      onChange={handleRepositorySelect}
                      aria-label="Select repository"
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
      


        {/* Search and Controls */}
        <div style={{ margin: '20px 0', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '300px' }}>
            <SearchInput
              placeholder="Search packages"
              value={searchTerm}
              onChange={handleSearch}
              onClear={handleClear}
              aria-label="Search packages"
            />
          </div>
          
          <ToggleGroup>
            <ToggleGroupItem
              text={`Available${searchTerm && filteredPackages.length > 0 ? (hasViewedPackagesSelected ? ` (${Math.max(0, filteredPackages.length - selectedCount)})` : ` (${filteredPackages.length})`) : ''}`}
              buttonId="toggle-available"
              isSelected={toggleSelected === 'toggle-available'}
              onChange={handleToggleChange}
            />
            <ToggleGroupItem
              text={`Selected${selectedCount ? ` (${selectedCount})` : ''}`}
              buttonId="toggle-selected"
              isSelected={toggleSelected === 'toggle-selected'}
              onChange={handleToggleChange}
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
        {searchTerm ? (
          <Table aria-label="Packages table" variant="compact">
            <Thead>
              <Tr>
                <Th aria-label="Select item"></Th>
                <Th>Name</Th>
                <Th>Application stream</Th>
                <Th>Retirement date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Individual Packages */}
              {paginatedPackages.map((pkg) => (
                <Tr key={pkg.name}>
                  <Td>
                    <Checkbox
                      id={`package-${pkg.name}`}
                      isChecked={selectedPackages.has(pkg.name)}
                      onChange={(event: React.FormEvent<HTMLInputElement>, checked: boolean) => handlePackageSelect(event, checked)}
                      aria-label={`Select package ${pkg.name}`}
                      data-package-name={pkg.name}
                    />
                  </Td>
                  <Td>
                    <span style={{ fontWeight: 'bold' }}>{pkg.name}</span>
                  </Td>
                  <Td>{pkg.stream || 'N/A'}</Td>
                  <Td>{pkg.end_date || 'N/A'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            fontStyle: 'italic'
          }}>
            Start typing in the search box to see packages
          </div>
        )}

        {/* Bottom Pagination */}
        <Pagination
          itemCount={totalItems}
          perPage={perPage}
          page={page}
          onSetPage={onSetPage}
          onPerPageSelect={onPerPageSelect}
          variant={PaginationVariant.bottom}
        />
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
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' }}>
          {/* Top Control Panel */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #d1d1d1',
            padding: '20px',
            zIndex: 1000
          }}>
            {/* Feature Toggle */}
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
            </div>
          </div>

          {/* Main Content with Sidebar */}
          {showAsOneStep ? (
            /* One Step View - Show all content without navigation */
            <div style={{ flex: 1, padding: '20px' }}>
              {/* Custom Repositories Step */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <Title headingLevel="h2" size="lg">
                    Custom Repositories
                  </Title>
                </div>
                {renderCustomRepositories()}
              </div>

              {/* Additional Packages Step */}
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <Title headingLevel="h2" size="lg">
                    Additional Packages
                  </Title>
                </div>
                {renderAdditionalPackages()}
              </div>
        </div>
      ) : (
        /* Two Step View - Original wizard with sidebar navigation */
        <div style={{ display: 'flex', flex: 1 }}>
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
                <NavItem 
                  itemId="custom-repositories" 
                  isActive={activeStep === 'custom-repositories'}
                  icon={<RepositoryIcon />}
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
                  icon={<PackageIcon />}
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
              </NavList>
            </Nav>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, padding: '20px' }}>

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
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};
