import React, { useCallback, useMemo } from "react";
// libraries
import { Box, Container, Typography, Checkbox } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
// hooks
import useQuestionsData from "../hooks/useQuestionsData";
// styles
import styles from "../styles/QuestionsTable.module.scss";
// components
import Loader from "./common/Loader";
import ExpandedQuestion from "./ExpandedQuestion";
// utils
import { sortStatus, sortBookmark } from "../utils/sortFunctionsForReactTable";
import { customStyles } from "../utils/customStylesForReactTable";
import BannerForQuestion from "./BannerForQuestion";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography sx={{ fontSize: "25px" }}>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

interface QuestionsTableProps {
  topicName: string;
}
const QuestionsTable = ({ topicName }: QuestionsTableProps) => {
  const {
    topicData,
    setTopicData,
    totalQuestionsCompletedPerTopic,
    totalQuestionsPresentPerTopic,
  } = useQuestionsData(topicName);

  const handleAddClick = useCallback(
    (id: string, questionsArray: any, type: string, attempts?: number) => {
      try {
        let newQuestionsData = null;
        let doneQuestionsPerTopic = null;
        let newTopicData = null;
        if (type === "attempts" && attempts !== undefined) {
          newQuestionsData = questionsArray.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                attempts: attempts + 1,
              };
            }

            return question;
          });
        } else if (type === "bookmark") {
          newQuestionsData = questionsArray.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                bookmark: true,
              };
            }

            return question;
          });
        } else if (type === "status") {
          newQuestionsData = questionsArray.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                status: true,
              };
            }

            return question;
          });

          doneQuestionsPerTopic = newQuestionsData.reduce(
            (acc: number, { status }: any) => {
              const temp = status ? 1 : 0;
              return acc + temp;
            },
            0
          );
        }

        if (newQuestionsData === null) return;

        if (doneQuestionsPerTopic === null) {
          newTopicData = {
            ...topicData,
            questions: newQuestionsData,
          };
        } else {
          newTopicData = {
            ...topicData,
            doneQuestions: doneQuestionsPerTopic,
            questions: newQuestionsData,
          };
        }

        setTopicData(newTopicData);
      } catch (error) {
        console.log(error);
      }
    },
    [setTopicData, topicData]
  );

  const handleRemoveClick = useCallback(
    (id: string, questionsArray: any, type: string, attempts?: number) => {
      try {
        let newQuestionsData = null;
        let doneQuestionsPerTopic = null;
        let newTopicData = null;
        if (type === "attempts" && attempts !== undefined && attempts > 0) {
          newQuestionsData = questionsArray.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                attempts: attempts - 1,
              };
            }

            return question;
          });
        } else if (type === "bookmark") {
          newQuestionsData = questionsArray.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                bookmark: false,
              };
            }

            return question;
          });
        } else if (type === "status") {
          newQuestionsData = questionsArray.map((question: any) => {
            if (question.id === id) {
              return {
                ...question,
                status: false,
              };
            }

            return question;
          });

          doneQuestionsPerTopic = newQuestionsData.reduce(
            (acc: number, { status }: any) => {
              const temp = status ? 1 : 0;
              return acc + temp;
            },
            0
          );
        }

        if (newQuestionsData === null) return;

        if (doneQuestionsPerTopic === null) {
          newTopicData = {
            ...topicData,
            questions: newQuestionsData,
          };
        } else {
          newTopicData = {
            ...topicData,
            doneQuestions: doneQuestionsPerTopic,
            questions: newQuestionsData,
          };
        }

        setTopicData(newTopicData);
      } catch (error) {
        console.log(error);
      }
    },
    [setTopicData, topicData]
  );

  const columns = useMemo(
    () => [
      {
        name: "Status",
        width: "10%",
        sortFunction: sortStatus,
        selector: (row: any) => {
          if (!row.status) {
            return (
              <Checkbox
                checked={false}
                size='small'
                onClick={() => {
                  handleAddClick(row.id, topicData.questions, "status");
                  toast.dismiss();
                  toast.success(
                    `${
                      totalQuestionsCompletedPerTopic + 1
                    }/${totalQuestionsPresentPerTopic} Done 🎉`
                  );
                }}
              />
            );
          } else {
            return (
              <Checkbox
                checked={true}
                size='small'
                onClick={() =>
                  handleRemoveClick(row.id, topicData.questions, "status")
                }
                sx={{
                  color: "#00A8FF",
                  "&.Mui-checked": {
                    color: "#00A8FF",
                  },
                }}
              />
            );
          }
        },
      },
      {
        name: "Question",
        width: "45%",
        selector: (row: any) => {
          return (
            <Link href={row.url1}>
              <a target='_blank' className={styles.link}>
                {row.question[0].toUpperCase() + row.question.slice(1)}
              </a>
            </Link>
          );
        },
      },
      {
        name: "Bookmark",
        width: "15%",
        selector: (row: any) => {
          if (row.bookmark) {
            return (
              <BookmarkAddedIcon
                sx={{ color: "#00A8FF" }}
                onClick={() => {
                  handleRemoveClick(row.id, topicData.questions, "bookmark");
                  toast.dismiss();
                  toast.warn("Bookmark removed 🔖");
                }}
              />
            );
          } else {
            return (
              <BookmarkAddIcon
                onClick={() => {
                  handleAddClick(row.id, topicData.questions, "bookmark");
                  toast.dismiss();
                  toast.info("Bookmark added 🔖");
                }}
              />
            );
          }
        },
        sortFunction: sortBookmark,
      },
      {
        name: "Notes",
        width: "10%",
        selector: (row: any) => {
          return (
            <TextSnippetRoundedIcon
              sx={row.notes.length > 0 ? { color: "#00A8FF" } : {}}
              onClick={() => {
                toast.dismiss();
                toast.info("Expand row to add notes 📓");
              }}
            />
          );
        },
      },
      {
        name: "Attempts",
        width: "10%",
        minWidth: "130px",
        selector: (row: any) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <ArrowCircleLeftRoundedIcon
                onClick={() =>
                  handleRemoveClick(
                    row.id,
                    topicData.questions,
                    "attempts",
                    row.attempts
                  )
                }
                sx={{
                  fontSize: "30px",
                  "&:hover": {
                    color: "#EA6153",
                  },
                  "&:active": {
                    transform: "scale(0.97)",
                  },
                }}
              />
              <Typography component='div' sx={{ fontSize: "20px", mx: 1 }}>
                {row.attempts}
              </Typography>
              <ArrowCircleRightRoundedIcon
                onClick={() =>
                  handleAddClick(
                    row.id,
                    topicData.questions,
                    "attempts",
                    row.attempts
                  )
                }
                sx={{
                  fontSize: "30px",
                  "&:hover": {
                    color: "#00A8FF",
                  },
                  "&:active": {
                    transform: "scale(0.97)",
                  },
                }}
              />
            </Box>
          );
        },
      },
    ],
    [
      handleAddClick,
      handleRemoveClick,
      topicData?.questions,
      totalQuestionsCompletedPerTopic,
      totalQuestionsPresentPerTopic,
    ]
  );

  if (!topicData) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BannerForQuestion
        topicData={topicData}
        totalQuestionsPresentPerTopic={totalQuestionsPresentPerTopic}
        totalQuestionsCompletedPerTopic={totalQuestionsCompletedPerTopic}
      />

      <Box
        sx={{
          width: "90%",
        }}
      >
        <DataTable
          // @ts-ignore
          columns={columns}
          data={topicData.questions}
          customStyles={customStyles}
          responsive
          striped
          highlightOnHover
          pointerOnHover
          persistTableHead
          expandableRowsComponent={ExpandedQuestion}
          pagination
          noHeader
          defaultSortFieldId={3}
          expandOnRowClicked
          expandableRows
          noContextMenu
        />
      </Box>
    </Container>
  );
};

export default QuestionsTable;
