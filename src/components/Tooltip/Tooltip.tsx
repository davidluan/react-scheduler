import { FC, useLayoutEffect, useRef } from "react";
import { dayWidth, weekWidth } from "@/constants";
import { useLanguage } from "@/context/LocaleProvider";
import Icon from "../Icon";
import {
  StyledContentWrapper,
  StyledInnerWrapper,
  StyledOvertimeWarning,
  StyledText,
  StyledTextWrapper,
  StyledTooltipBeak,
  StyledTooltipContent,
  StyledTooltipWrapper
} from "./styles";
import { TooltipProps } from "./types";

const Tooltip: FC<TooltipProps> = ({ tooltipData, zoom }) => {
  const { taken, free, over } = useLanguage();

  const { coords, title, subtitle } = tooltipData;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const width = zoom === 0 ? weekWidth : dayWidth;

  useLayoutEffect(() => {
    // re calculate tooltip width before repaint
    if (!tooltipRef.current) return;

    const { width: tooltipWidth } = tooltipRef.current.getBoundingClientRect();

    const xOffset = tooltipWidth / 2 + width / 2;
    tooltipRef.current.style.left = `${coords.x - xOffset}px`;
    tooltipRef.current.style.top = `${coords.y + 8}px`;

    // disposition.overtime affects tooltip's width, thus it's needed to recalculate it's coords whenever overtime changes
  }, [coords.x, width, coords.y]);

  return (
    <StyledTooltipWrapper ref={tooltipRef}>
      <StyledTooltipContent>
        <StyledContentWrapper>
          <StyledInnerWrapper>
            <Icon iconName="calendarWarning" height="14" />
            <StyledTextWrapper>
              <StyledText>{`Type: ${title}`}</StyledText>
            </StyledTextWrapper>
          </StyledInnerWrapper>
          <StyledInnerWrapper>
            <Icon iconName="calendarFree" height="14" />
            <StyledTextWrapper>
              <StyledText>{`Name: ${subtitle}`}</StyledText>
            </StyledTextWrapper>
          </StyledInnerWrapper>
        </StyledContentWrapper>
      </StyledTooltipContent>
      <StyledTooltipBeak />
    </StyledTooltipWrapper>
  );
};

export default Tooltip;
