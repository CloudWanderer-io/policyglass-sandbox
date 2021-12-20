import json
from policyglass import Policy, dedupe_policy_shards, policy_shards_effect, policy_shards_to_json


def lambda_handler(event, context):
    """Return a list of PolicyGlass PolicyShards from a given policy."""
    input_policy = json.loads(json.loads(event["body"]))
    try:
        policy = Policy(**input_policy)
    except Exception as ex:
        return {
            "isBase64Encoded": False,
            "statusCode": 400,
            "headers": {
                "X-Amzn-ErrorType": "InvalidParameterException",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
            },
            "body": json.dumps({"errorMessage": f"{ex} - event"}),
        }

    deduped_shards = dedupe_policy_shards(policy.policy_shards)
    shards_effect = policy_shards_effect(deduped_shards)
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        },
        "body": json.dumps(
            json.loads(
                policy_shards_to_json(
                    shards_effect,
                    exclude_defaults=True,
                )
            )
        ),
    }
