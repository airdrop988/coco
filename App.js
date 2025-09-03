import React from 'react';
import './index.css';
import './App.css';
import '@salt-ds/theme/index.css';
import "@salt-ds/ag-grid-theme/salt-ag-theme.css";
import '@salt-ds/icons/saltIcons.css';
import '@jpmuitk/style/css/jpmuitk.css';
import 'ag-grid-community/styles/ag-grid.css';
// import WorkList from '../dist/commonjs/components/WorkList';
import { useTheme } from "@salt-ds/core";
import {
    DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER,
    CROSSMARGIN_COLUMNS,
} from "./Constant";

function App() {
    const toCamelCase = str =>
        str
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                index === 0 ? word.toLowerCase() : word.toUpperCase()
            )
            .replace(/\s+/g, '');

    console.log("DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER",DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER);

    const CROSSMARGIN_DEFAULT_COLUMNS = CROSSMARGIN_COLUMNS.map(col => ({
        name: toCamelCase(col),
        displayName: col
    }));

    const [columns, setColumns] = React.useState(DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER);

    const handleFieldChange = (fieldName, value, formState, tabIndex) => {
        console.log(`Field ${fieldName} changed to ${value} on tab ${tabIndex}`);
        console.log('Current form state:', formState);
        switch (value) {
            case "DERIVATIVES":
            case "PB":
            case "GC":
            case "FI-REPO":
            case "TBA":
            case "TCP":
                setColumns(DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER);
                break;
            case "CROSS MARGIN":
                setColumns(CROSSMARGIN_DEFAULT_COLUMNS);
                break;
            default:
                setColumns(DERIVATIVES_DEFAULT_COLUMNS_AS_BLOTTER);
                break;
        }
    };

    const { mode } = useTheme();

    const allProps = {
        showMetrics: true,
        showBlotter: true,
        align: "start",
        className: "custom-worklist",
        metrics: {
            totalPending: { value: 235 },
            pendingToday: { value: 57, subtitle: "New Today" },
            pendingByStatus: [
                { title: "High Priority", value: 78 },
                { title: "Medium Priority", value: 92 },
                { title: "Low Priority", value: 65 }
            ]
        },
        onItemClick: (metric) => console.log("Metric clicked:", metric),
        //blotterHeight: "450px",
        columns: columns,
        data: [],
        onBlotterRowClick: (row) => console.log("Row clicked:", row),
        componentId: "all-props-worklist",
        blotterTopic: "all-props-topic",
        apiType: "rest",
        hostUrl: "http://localhost:92",
        serviceEndPointPath: '/omcm/api/margincalls/v2/search',
        httpMethod: "POST",
        payload: {"filter":[
                {"property":"productType","operator":"EQUALS","value":"DERIVATIVES"},
                {"property":"nonCallDay","operator":"EQUALS","value":false},
                {"property":"asOfDate","operator":"GREATER_THAN_EQUALS","value":"27-Aug-2025"},
                {"property":"startDate","operator":"GREATER_THAN_EQUALS","value":"2025-08-27"},
                {"property":"asOfDate","operator":"LESS_THAN_EQUALS","value":"27-Aug-2025"},
                {"property":"endDate","operator":"LESS_THAN_EQUALS","value":"2025-08-27"},
                {"property":"region","operator":"EQUALS","value":"AMERICA"}
            ]},
        density: "high",
        tabTitles: ["My Worklist", "Team Worklist", "Call Search"],
        activeTabIndex: 0,
        onTabChange: (index, title) => console.log("Tab changed:", index, title),
        hideMetricsOnTabIndex: 2,
        onSearch: (criteria) => console.log("Search:", criteria),
        onReset: () => console.log("Reset"),
        onFieldChange: (fieldName, value, formState, tabIndex) => handleFieldChange(fieldName, value, formState, tabIndex),
        searchFields: [
            {
                id: "product",
                label: "Product",
                options: ["CROSS MARGIN", "DERIVATIVES", "PB", "GC", "FI-REPO", "TBA", "TCP"]
            },
            {
                id: "region",
                label: "Region",
                options: ["AMERICA", "ASIA", "EUROPE", "FRANCE", "INDIA", "SAMERICA"]
            },
            {
                id: "csr",
                label: "CSR",
                options: ["CSR1", "CSR2", "CSR3", "CSR4"]
            },
            {
                id: "legalEntity",
                label: "Legal Entity",
                options: ["JPM Securities", "JPM Chase Bank", "JPM Asset Management"]
            },
            {
                id: "counterparty",
                label: "Counterparty",
                options: ["Client A", "Client B", "Client C", "Client D"]
            }
        ],
        resetButtonLabel: "Reset",
        searchButtonLabel: "Search",
        productOptions: ["Equity", "FX"],
        regionOptions: ["EMEA", "APAC"],
        csrOptions: ["CSR1", "CSR2"],
        legalEntityOptions: ["LE1", "LE2"],
        counterpartyOptions: ["CP1", "CP2"],
        searchProps: {
            placeholder: "Search...",
            debounceTime: 300,
            minSearchLength: 2
        },
        theme: mode,
        themeObj: undefined,
        fetchCallback: async () => [],
        myWorklistProps: { toolbarItems: [] },
        teamWorklistProps: { toolbarItems: [] },
        callsProps: { toolbarItems: [] },
        loading: false,
    };

    const fetchCallbackMockedData = async (filterRule, tabIndex = 0) => {
        // Return different data sets based on active tab index
        switch (tabIndex) {
            case 0: // My Worklist tab
                return [];
            case 1: // My Team Worklist tab
                return [];
            case 2: // Calls tab
                return [];
            default:
                return [];
        }
    };
    return (
        <div className="App">
            {/* <WorkList
                {...allProps}
            /> */
            
            <p>Phani</p>
            
            }

        </div>
    );
}

export default App;
