import { BiRegularX } from "solid-icons/bi";
import { Show } from "solid-js";

import { useTranslation } from "@revolt/i18n";
import { Markdown } from "@revolt/markdown";
import { Button, Column, Row, Typography } from "@revolt/ui";

import { modalController } from "..";
import { PropGenerator } from "../types";

/**
 * Modal to display server information
 */
const ServerInfo: PropGenerator<"server_info"> = (props, onClose) => {
  const t = useTranslation();

  return {
    title: (
      <Row align="center">
        <Column grow>
          <Typography variant="legacy-settings-title">
            {props.server.name}
          </Typography>
        </Column>
        <Button compact="icon" palette="plain" onClick={onClose}>
          <BiRegularX size={36} />
        </Button>
      </Row>
    ),
    children: (
      <Show when={props.server.description}>
        <Markdown content={props.server.description!} />
      </Show>
    ),
    actions: [
      {
        // TODO: report server
        onClick: () => true, //report(server),
        children: t("app.special.modals.actions.report"),
        palette: "error",
      },
      {
        onClick: () =>
          modalController.push({
            type: "server_identity",
            member: props.server.member!,
          }),
        children: "Edit Identity",
        palette: "secondary",
      },
    ],
  };
};

export default ServerInfo;
