"use client";
import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import cx from "classnames";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Chart from "@/components/Chat/index";
import ShankeyChart from "@/components/ShankeyChart/ShankeyChart";
import CodeEditor from "@/components/CodeEditor";
// import ImportExportIcon from "@mui/icons-material/ImportExport";

import styles from "./chatHistory.module.scss";

const sectionId = {
  USER_QUESTION: "USER_QUESTION",
  DATABASE_QUERY_SECTION: "DATABASE_QUERY_SECTION",
  SOLUTION_DETAILS: "SOLUTION_DETAILS",
  SUGGESTION_QUESTION: "SUGGESTION_QUESTION",
};

const componentId = {
  LIST: "LIST",
  PIE: "PIE",
  LONG: "LONG",
};

const mock = [
  {
    id: "ssad",
    sectionId: sectionId.USER_QUESTION,
    description: "How to do this?",
  },
  {
    id: "sssda",
    sectionId: sectionId.DATABASE_QUERY_SECTION,
    description: "Sql query",
  },
  {
    id: "sdsa",
    sectionId: sectionId.SOLUTION_DETAILS,
    description: "How to do thisdfadasdsa sa sad as d sada?",
    subDescription: "How tsa dasd sa o do this?",
    solutionAccordionLabel: "top 2 area to save",
    solutionComponentId: "List",
    solutionComponentData: ["sadasddsa", "asda"],
  },
];

const questionId = {
  TOP_CLOUD_COST_BY_SERVICE_ID_123: "TOP_CLOUD_COST_BY_SERVICE_ID_123",
  HOW_CAN_I_REDUCE_MY_EC2_COST: "HOW_CAN_I_REDUCE_MY_EC2_COST",
  WHY_EC2_COST_INCREASING_SO_MUCH: "WHY_EC2_COST_INCREASING_SO_MUCH",
};

const questionIdVsQuestionDetails = {
  [questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123]: {
    description: "Top cloud cost by service (#24542)",
  },
  [questionId.HOW_CAN_I_REDUCE_MY_EC2_COST]: {
    description: "How can i reduce my ec2 cost?",
  },
  [questionId.WHY_EC2_COST_INCREASING_SO_MUCH]: {
    description: "why ec2 cost increasing so much?",
  },
};

// each solution step will be separate section in chatHistory
const questionIdVsSolutionStepDetails = {
  [questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123]: {
    steps: [
      {
        id: "sssda",
        sectionId: sectionId.USER_QUESTION,
        description:
          "Top cloud costs by services in production account (#24542)",
      },
      {
        id: "sssda",
        sectionId: sectionId.DATABASE_QUERY_SECTION,
        description: "How to do this?",
      },
      {
        id: "sdsa",
        sectionId: sectionId.SOLUTION_DETAILS,
        description:
          "Your production account (#24542) has accumulated costs of $100,000 over the past month, here is a spread of cloud costs by services;",
        subDescription: "",
        solutionAccordionLabel: "Pie Chart",
        solutionComponentId: "PIE",
        solutionComponentData: ["sadasddsa", "asda"],
        questionId: questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123,
        waitInitialTime: 3500,
      },
    ],
  },
  [questionId.HOW_CAN_I_REDUCE_MY_EC2_COST]: {
    steps: [
      {
        id: "sssda",
        sectionId: sectionId.USER_QUESTION,
        description: "How can I reduce my ec2 costs?",
      },
      {
        id: "sdsa",
        sectionId: sectionId.SOLUTION_DETAILS,
        description:
          "You can save $2500 per month overall in EC2 costs. Click here to access the detailed report",
        subDescription: "How tsa dasd sa o do this?",
        solutionAccordionLabel: "Top 2 saving areas",
        solutionComponentId: "LIST",
        solutionComponentData: ["sadasddsa", "asda"],
        questionId: questionId.HOW_CAN_I_REDUCE_MY_EC2_COST,
      },
    ],
  },
  [questionId.WHY_EC2_COST_INCREASING_SO_MUCH]: {
    steps: [
      {
        id: "sssda",
        sectionId: sectionId.USER_QUESTION,
        description: "Why are EC2 costs increasing so much?",
      },
      {
        id: "sdsa",
        sectionId: sectionId.SOLUTION_DETAILS,
        description:
          "Your production account (#24542) has accumulated cost of $100,000 over the past month, here is a spread of cloud costs by services;",
        subDescription: "How tsa dasd sa o do this?",
        solutionAccordionLabel: "Dashboard",
        solutionComponentId: "LONG",
        solutionComponentData: ["sadasddsa", "asda"],
        questionId: questionId.WHY_EC2_COST_INCREASING_SO_MUCH,
      },
    ],
  },
};

const questionIdVsSuggestionQuestionList = {
  [questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123]: [
    questionId.HOW_CAN_I_REDUCE_MY_EC2_COST,
    questionId.HOW_CAN_I_REDUCE_MY_EC2_COST,
    questionId.HOW_CAN_I_REDUCE_MY_EC2_COST,
    questionId.HOW_CAN_I_REDUCE_MY_EC2_COST,
  ],
  [questionId.HOW_CAN_I_REDUCE_MY_EC2_COST]: [
    questionId.WHY_EC2_COST_INCREASING_SO_MUCH,
    questionId.WHY_EC2_COST_INCREASING_SO_MUCH,
    questionId.WHY_EC2_COST_INCREASING_SO_MUCH,
    questionId.WHY_EC2_COST_INCREASING_SO_MUCH,
  ],
};

const INITIAL_SUGGESTION_QUESTION_LIST = [
  questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123,
  questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123,
  questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123,
  questionId.TOP_CLOUD_COST_BY_SERVICE_ID_123,
];

const CustomTypography = ({ children, ...restProps }) => {
  return (
    <Typography variant="caption" display="block" gutterBottom {...restProps}>
      {children}
    </Typography>
  );
};

const UserQuestionSection = ({ description }) => {
  return (
    <div className={styles.userQuestionSectionContainer}>
      <div>
        <img src="/face.svg" height={20} width={20} />
      </div>
      <CustomTypography>{description}</CustomTypography>
    </div>
  );
};

const CustomAccordion = ({ title, children, expanded, onExpand }) => {
  return (
    <Accordion expanded={expanded} sx={{ boxShadow: "none" }}>
      <AccordionSummary
        onClick={onExpand}
        expandIcon={
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "grey" }} />
        }
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography
          as="div"
          variant="caption"
          display="block"
          gutterBottom
          sx={{ minWidth: "max-content", color: "grey" }}
        >
          {title || "asdass"}
        </Typography>
        <div className={styles.divider}></div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const DatabaseQuerySection = ({ description }) => {
  const [showDatabaseQuery, setShowDatabaseQuery] = useState(false);
  const [expandAccordian, setExpandAccordian] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowDatabaseQuery(true), 1000);
    setTimeout(() => setExpandAccordian(false), 3000);
  }, []);

  const renderGeneratingQuery = () => {
    // if (showDatabaseQuery) return null;

    return (
      <div
        className={cx(styles.GeneratingQueryContainer, {
          [styles.hide]: showDatabaseQuery,
        })}
      >
        <div>
          <img src="/astuto.svg" height={20} width={20} />
        </div>
        <div className={styles.databaseQuerySectionHeading}>
          <CustomTypography>{"generating SQL Query"}</CustomTypography>
          <CircularProgress className={styles.circularProgress} />
        </div>
      </div>
    );
  };

  const renderDatabaseQuerySection = () => {
    // if (!showDatabaseQuery) return null;

    return (
      <div
        className={cx(styles.databaseQuerySectionContainer, {
          [styles.show]: showDatabaseQuery,
        })}
      >
        <CustomAccordion
          expanded={expandAccordian}
          title={"query"}
          onExpand={() => setExpandAccordian(!expandAccordian)}
        >
          {expandAccordian && <CodeEditor />}
        </CustomAccordion>
      </div>
    );
  };

  return (
    <div>
      {renderGeneratingQuery()}
      {renderDatabaseQuerySection()}
    </div>
  );
};

const handleBottomScroll = () => {
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight + 100,
    behavior: "smooth",
  });
};

function useDelayUnmount(isMounted, delayTime) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

const ListComponent = () => {
  const data = new Array(2).fill(0);
  return (
    <div className={styles.listComponentContainer}>
      {data.map((val, index) => {
        return (
          <div key={index} className={styles.listComponentItem}>
            <CustomTypography sx={{ fontWeight: "bold" }}>
              {"Bucket xyz-logs-1 (production account #12345)"}
            </CustomTypography>
            <CustomTypography sx={{ lineHeight: "normal" }}>
              {
                "This bucket has 1 TB of data, and it does not use any storage tiers. There is more than 500 GB of data that has not been accessed. You can save $1000 by deleting that data or $700 by moving them to lower"
              }
            </CustomTypography>
          </div>
        );
      })}
    </div>
  );
};

const solutionComponentIdVsComponent = {
  [componentId.PIE]: Chart,
  [componentId.LIST]: ListComponent,
  [componentId.LONG]: ShankeyChart,
};

const SolutionDetailsSection = ({
  description,
  subDescription,
  solutionAccordionLabel,
  solutionComponentId,
  solutionComponentData,
  shouldShowSuggestionQuestion,
  questionId,
  onClick,
  waitInitialTime = 0,
}) => {
  const suggestionQuestionList =
    questionIdVsSuggestionQuestionList[questionId] || [];

  const Component = solutionComponentIdVsComponent[solutionComponentId];

  const [showTitleLoading, setShowTitleLoading] = useState(true);
  const [expandAccordian, setExpandAccordian] = useState(true);
  const [showComponent, setShowComponent] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandSuggestionAccordian, setExpandSuggestionAccordian] =
    useState(true);

  const [showSolutionDetailsSection, setShowSolutionDetailsSection] =
    useState(false);

  //   const shouldRenderChild = useDelayUnmount(showTitleLoading, 500);
  const mountedStyle = { animation: "inAnimation 500ms ease-in" };
  const unmountedStyle = { animation: "outAnimation 510ms ease-in" };

  useEffect(() => {
    setTimeout(() => {
      setShowSolutionDetailsSection(true);
      setTimeout(() => setShowTitleLoading(false), 1000);
      setTimeout(() => setShowComponent(true), 2000);
      setTimeout(() => setShowSuggestions(true), 3000);
    }, waitInitialTime); // this initial load time should come from prop
  }, []);

  useEffect(() => {
    handleBottomScroll();
  }, [
    showSolutionDetailsSection,
    showTitleLoading,
    showComponent,
    showSuggestions,
  ]);

  const renderHeader = () => {
    const headerLabel = showTitleLoading ? "compiling Data" : description;

    return (
      <div>
        <div className={styles.solutionDetailsHeaderSection}>
          <div>
            <img src="/astuto.svg" height={20} width={20} />
          </div>
          {
            <div
              style={showTitleLoading ? mountedStyle : unmountedStyle}
              className={cx(styles.solutionDetailsSectionHeader, {
                //   [styles.hideFull]: !showTitleLoading,
              })}
            >
              <CustomTypography>{headerLabel}</CustomTypography>
              {showTitleLoading && (
                <CircularProgress className={styles.circularProgress} />
              )}
            </div>
          }
        </div>
      </div>
    );
  };

  // const CustomAccordion = ({ title, children, expanded }) => {

  const renderComponent = () => {
    return (
      <div style={showComponent ? mountedStyle : unmountedStyle}>
        {showComponent && (
          <CustomAccordion
            title={solutionAccordionLabel}
            expanded={expandAccordian}
            onExpand={() => setExpandAccordian(!expandAccordian)}
          >
            <div className={styles.solutionDetailsSectionComponent}>
              <Component />
            </div>
          </CustomAccordion>
        )}
      </div>
    );
  };

  const renderSuggestionQuestion = () => {
    return (
      <div style={showSuggestions ? mountedStyle : unmountedStyle}>
        {showSuggestions && (
          <CustomAccordion
            title="You might also want to know"
            expanded={expandSuggestionAccordian}
            onExpand={() =>
              setExpandSuggestionAccordian(!expandSuggestionAccordian)
            }
          >
            <SuggestionQuestion
              suggestionQuestionList={suggestionQuestionList}
              onClick={onClick}
            />
          </CustomAccordion>
        )}
      </div>
    );
  };

  if (!showSolutionDetailsSection) return null;

  return (
    <div className={styles.solutionDetailsSectionContainer}>
      {renderHeader()}
      {renderComponent()}
      {renderSuggestionQuestion()}
    </div>
  );
};

const SuggestionQuestion = ({ suggestionQuestionList = [], onClick }) => {
  if (suggestionQuestionList.length === 0) return null;
  return (
    <span className={styles.suggestionContainer}>
      {suggestionQuestionList.map((suggestionQuestionIds) => {
        const suggestionQuestionDetails =
          questionIdVsQuestionDetails[suggestionQuestionIds];
        return (
          <span
            key={1}
            onClick={() => onClick(suggestionQuestionIds)}
            className={styles.suggestionItem}
          >
            <CustomTypography>
              {suggestionQuestionDetails?.description}
            </CustomTypography>
            <SendIcon
              className={styles.suggestionItemSentIcon}
              sx={{ fontSize: 16, color: "#72e972" }}
            />
          </span>
        );
      })}
    </span>
  );
};

const sectionIdVsComponent = {
  [sectionId.USER_QUESTION]: UserQuestionSection,
  [sectionId.DATABASE_QUERY_SECTION]: DatabaseQuerySection,
  [sectionId.SOLUTION_DETAILS]: SolutionDetailsSection,
  [sectionId.SUGGESTION_QUESTION]: SuggestionQuestion,
};

const ChatHistory = () => {
  const [chatHistoryList, setChatHistoryList] = useState([]);
  const [satisfactoryFeedback, setSatisfactoryFeedback] = useState(null);
  const [showSatisfactoryFeedback, setShowSatisfactoryFeedback] =
    useState(false);
  const satisfactoryRef = useRef();

  const mountedStyle = { animation: "inAnimation 500ms ease-in" };
  const unmountedStyle = { animation: "outAnimation 510ms ease-in" };

  const handleQuestionClick = (questionId) => {
    const solution = questionIdVsSolutionStepDetails[questionId];
    const { steps } = solution || {};

    setChatHistoryList([...chatHistoryList, ...steps]);
  };

  useEffect(() => {
    if (chatHistoryList.length > 0 && showSatisfactoryFeedback === false)
      setTimeout(() => setShowSatisfactoryFeedback(true), 7000);
  }, [chatHistoryList]);

  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       console.log("abc", satisfactoryRef?.current);
  //       satisfactoryRef?.current?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "end",
  //         inline: "nearest",
  //       });
  //     }, 100);

  //     return () => clearInterval(id);
  //   }, [chatHistoryList]);

  const renderSection = () => {
    return chatHistoryList.map((sectionDetail, index) => {
      const Component = sectionIdVsComponent[sectionDetail.sectionId];
      handleBottomScroll();

      return (
        <div key={sectionDetail.id}>
          <Component {...sectionDetail} onClick={handleQuestionClick} />
        </div>
      );
    });
  };

  const renderSatisfactoryFeedbackSection = () => {
    if (chatHistoryList.length === 0) return null;

    const isFeedbackSubmitted = satisfactoryFeedback != null;

    const label = !isFeedbackSubmitted
      ? "Have the answers been satisfactory so far ?"
      : "Thank you for your feedback!";

    return (
      <div style={showSatisfactoryFeedback ? mountedStyle : unmountedStyle}>
        {showSatisfactoryFeedback && (
          <div className={styles.satisfactoryFeedbackSectionContainer}>
            <CustomTypography
              ref={satisfactoryRef}
              sx={{ backgroundColor: "gey" }}
            >
              {label}
            </CustomTypography>
            {!isFeedbackSubmitted && (
              <div className={styles.satisfactoryFeedbackSectionIconContainer}>
                <span
                  onClick={() => setSatisfactoryFeedback(true)}
                  className={styles.thumbUpIcon}
                >
                  <ThumbUpIcon sx={{ fontSize: 16 }} />
                </span>
                <span
                  onClick={() => setSatisfactoryFeedback(false)}
                  className={styles.thumbDownIcon}
                >
                  <ThumbDownIcon sx={{ fontSize: 16 }} />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderInitialSuggestionQuestion = () => {
    // if (chatHistoryList.length !== 0) return null;

    const hide = chatHistoryList.length !== 0;

    return (
      <div
        className={cx({
          [styles.hide]: hide,
          [styles.disableInitialSuggestionQuestion]: hide,
        })}
      >
        <SuggestionQuestion
          suggestionQuestionList={INITIAL_SUGGESTION_QUESTION_LIST}
          onClick={handleQuestionClick}
        />
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      {/* <ShankeyChart /> */}
      <div className={styles.renderSectionContainer}>{renderSection()}</div>
      {renderSatisfactoryFeedbackSection()}
      <div className={styles.bottomContainerParent}>
        <div className={styles.bottomContainer}>
          {renderInitialSuggestionQuestion()}
          <div className={styles.inputContainer}>
            {/* <div className={styles.inputContainer}> */}
            <CustomTypography>
              Start typing your Query here...{" "}
            </CustomTypography>
            <div className={styles.inputBoxIcon}>
              <CodeOffIcon sx={{ fontSize: 16 }} />
              <SendIcon sx={{ fontSize: 16 }} />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
