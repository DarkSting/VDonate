function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function BloodStockTabs() {
    const [currentTab, setCurrentTab] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue);
    };
  
    return (
      <div>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Multiple Tabs Example"
        >
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          Content of Tab 1
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          Content of Tab 2
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          Content of Tab 3
        </TabPanel>
      </div>
    );
  }
  
  export default BloodStockTabs;
  