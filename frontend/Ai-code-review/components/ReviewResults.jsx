import React from "react";
import { Card } from "./Card"; // Adjust path if needed
import { Badge } from "./Badge"; // Adjust path if needed
import { QualityChart } from "./QualityChart";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export const ReviewResults = ({ result }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "error";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle2 className="w-5 h-5" />;
    if (score >= 60) return <AlertCircle className="w-5 h-5" />;
    return <XCircle className="w-5 h-5" />;
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  const scoreColor = getScoreColor(result.score);
  const scoreIcon = getScoreIcon(result.score);
  const scoreLabel = getScoreLabel(result.score);

  return (
    <div className="space-y-6">
      {/* Quality Score Card */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Code Quality Score
          </h2>
          <Badge
            className={`
              ${
                scoreColor === "success"
                  ? "bg-success/20 text-success border-success/30"
                  : ""
              }
              ${
                scoreColor === "warning"
                  ? "bg-warning/20 text-warning border-warning/30"
                  : ""
              }
              ${
                scoreColor === "error"
                  ? "bg-error/20 text-error border-error/30"
                  : ""
              }
            `}
          >
            <div className="flex items-center gap-1">
              {scoreIcon}
              {scoreLabel}
            </div>
          </Badge>
        </div>

        <div className="flex items-center justify-center">
          <QualityChart score={result.score} />
        </div>
      </Card>

      {/* Feedback Card */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border border-border shadow-lg">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          AI Feedback
        </h2>

        <div className="space-y-3">
          {result.feedback.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center justify-center mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            💡 AI-generated suggestions to help improve your code quality and
            maintainability
          </p>
        </div>
      </Card>
    </div>
  );
};
