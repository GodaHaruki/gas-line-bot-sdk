import {
  WebhookEvent,
  WebhookRequestBody,
  MessageEvent,
  UnsendEvent,
  FollowEvent,
  UnfollowEvent,
  JoinEvent,
  LeaveEvent,
  MemberJoinEvent,
  MemberLeaveEvent,
  PostbackEvent,
  VideoPlayCompleteEvent,
  BeaconEvent,
  AccountLinkEvent,
  LINEThingsScenarioExecutionEvent,
} from "@line/bot-sdk";

type LINEWebhookEventImplement<Evt extends WebhookEvent> = (
  evt: Evt
) => Promise<void>;

interface LINEWebhookEventImplements {
  message?: LINEWebhookEventImplement<MessageEvent>; // anyにして実装の自由度を上げてもいいかも
  unsend?: LINEWebhookEventImplement<UnsendEvent>;
  follow?: LINEWebhookEventImplement<FollowEvent>;
  unfollow?: LINEWebhookEventImplement<UnfollowEvent>;
  join?: LINEWebhookEventImplement<JoinEvent>;
  leave?: LINEWebhookEventImplement<LeaveEvent>;
  memberJoined?: LINEWebhookEventImplement<MemberJoinEvent>;
  memberLeft?: LINEWebhookEventImplement<MemberLeaveEvent>;
  postback?: LINEWebhookEventImplement<PostbackEvent>;
  videoPlayComplete?: LINEWebhookEventImplement<VideoPlayCompleteEvent>;
  beacon?: LINEWebhookEventImplement<BeaconEvent>;
  accountLink?: LINEWebhookEventImplement<AccountLinkEvent>;
  things?: LINEWebhookEventImplement<LINEThingsScenarioExecutionEvent>;
}

class LINEWebHookEventHandlers {
  eventsHandler: LINEWebhookEventImplements;

  constructor(eventImplements?: LINEWebhookEventImplements) {
    if (eventImplements) {
      this.eventsHandler = eventImplements;
    } else {
      this.eventsHandler = {};
    }
  }

  handle(evt: WebhookRequestBody): Promise<void> {
    return new Promise((resolve, reject) => {
      evt.events.forEach((e) => {
        const type = e.type;
        const handler = this.eventsHandler[type];
        if (handler) {
          resolve(handler(e as any)); // evt.typeがhandlerのタイプと一致するからanyでごまかす
        } else {
          reject(`${type} handler is not implemented`);
        }
      });
    });
  }

  protected setHandler<Evt extends WebhookEvent>(
    handlerName: keyof LINEWebhookEventImplements,
    f: LINEWebhookEventImplement<Evt>
  ) {
    if (!handlerName) {
      throw TypeError("handlerName is empty");
    }

    this.eventsHandler[handlerName] = f as any; // handlerNameがhandlerのタイプと一致するからanyでごまかす
  }

  // (
  //   [
  //     "message",
  //     "unsend",
  //     "follow",
  //     "unfollow",
  //     "join",
  //     "leave",
  //     "memberJoined",
  //     "memberLeft",
  //     "postback",
  //     "videoPlayComplete",
  //     "beacon",
  //     "accountLink",
  //     "things",
  //   ] as (keyof LINEWebhookEventImplements)[]
  // ).forEach((k) => Object.defineProperty(this, k, this.eventsHandler[k]!));

  set message(f: LINEWebhookEventImplement<MessageEvent>) {
    this.setHandler("message", f);
  }

  set unsend(f: LINEWebhookEventImplement<UnsendEvent>) {
    this.setHandler("unsend", f);
  }

  set follow(f: LINEWebhookEventImplement<FollowEvent>) {
    this.setHandler("follow", f);
  }

  set unfollow(f: LINEWebhookEventImplement<UnfollowEvent>) {
    this.setHandler("unfollow", f);
  }

  set join(f: LINEWebhookEventImplement<JoinEvent>) {
    this.setHandler("join", f);
  }

  set leave(f: LINEWebhookEventImplement<LeaveEvent>) {
    this.setHandler("leave", f);
  }

  set memberJoined(f: LINEWebhookEventImplement<MemberJoinEvent>) {
    this.setHandler("memberJoined", f);
  }

  set memberLeft(f: LINEWebhookEventImplement<MemberLeaveEvent>) {
    this.setHandler("memberLeft", f);
  }

  set postback(f: LINEWebhookEventImplement<PostbackEvent>) {
    this.setHandler("postback", f);
  }

  set videoPlayComplete(f: LINEWebhookEventImplement<VideoPlayCompleteEvent>) {
    this.setHandler("videoPlayComplete", f);
  }

  set beacon(f: LINEWebhookEventImplement<BeaconEvent>) {
    this.setHandler("beacon", f);
  }

  set accountLink(f: LINEWebhookEventImplement<AccountLinkEvent>) {
    this.setHandler("accountLink", f);
  }

  set things(f: LINEWebhookEventImplement<LINEThingsScenarioExecutionEvent>) {
    this.setHandler("things", f);
  }
}

export default LINEWebHookEventHandlers;
