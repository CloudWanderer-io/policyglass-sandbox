import json
from policyglass import (
    Policy,
    policy_shards_effect,
    policy_shards_to_json,
    delineate_intersecting_shards,
)


def lambda_handler(event, context):
    """Return a list of PolicyGlass PolicyShards from a given policy."""
    input_policy = json.loads(event["body"])
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

    shards_effect = delineate_intersecting_shards(
        policy_shards_effect(policy.policy_shards)
    )
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        },
        "body": json.dumps(
            {
                "explain": [shard.explain for shard in shards_effect],
                "shards": json.loads(
                    policy_shards_to_json(
                        shards_effect,
                        exclude_defaults=True,
                    )
                ),
            }
        ),
    }
